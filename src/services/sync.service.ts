import Realm from "realm";

import { mapDTOToLocalWorkOrder, normalizeId } from "@/data/realm/mappers";
import { getRealm } from "@/data/realm/realm";
import {
  ConflictResolution,
  resolveWorkOrderConflict,
} from "@/domain/workOrders/conflict";
import { LocalWorkOrder } from "@/domain/workOrders/localWorkOrder";
import { WorkOrder } from "@/domain/workOrders/types";
import { WorkOrdersAPI } from "@/services/workOrders.api";

const LAST_SYNC_KEY = "lastSyncAt";

function getNowIso() {
  return new Date().toISOString();
}

function mapRealmObjectToLocalWorkOrder(item: any): LocalWorkOrder {
  return {
    id: String(item.id),
    title: item.title,
    description: item.description,
    status: item.status,
    assignedTo: item.assignedTo,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,
    completed: item.completed,
    deleted: item.deleted,
    dirty: item.dirty,
    syncStatus: item.syncStatus,
    pendingAction: item.pendingAction ?? null,
  };
}

function applyRemoteToRealmObject(target: any, remote: WorkOrder) {
  target.id = String(remote.id);
  target.title = remote.title;
  target.description = remote.description;
  target.status = remote.status;
  target.assignedTo = remote.assignedTo;
  target.createdAt = remote.createdAt;
  target.updatedAt = remote.updatedAt;
  target.deletedAt = remote.deletedAt;
  target.completed = remote.completed;
  target.deleted = remote.deleted;
  target.dirty = false;
  target.syncStatus = "synced";
  target.pendingAction = null;
}

function applyConflictResolution(
  realm: Realm,
  existing: any,
  resolution: ConflictResolution,
) {
  if (resolution.type === "use_remote") {
    applyRemoteToRealmObject(existing, resolution.remote);
    return;
  }

  if (resolution.type === "delete_local") {
    realm.delete(existing);
    return;
  }
}

async function getLastSyncAtFromRealm(): Promise<string | null> {
  const realm = await getRealm();
  const meta = realm.objectForPrimaryKey<any>("SyncMeta", LAST_SYNC_KEY);
  return meta?.value ?? null;
}

async function setLastSyncAtInRealm(value: string): Promise<void> {
  const realm = await getRealm();

  realm.write(() => {
    realm.create(
      "SyncMeta",
      {
        key: LAST_SYNC_KEY,
        value,
      },
      Realm.UpdateMode.Modified,
    );
  });
}

async function getPendingItems(): Promise<LocalWorkOrder[]> {
  const realm = await getRealm();

  const results = realm
    .objects("WorkOrder")
    .filtered("dirty == true")
    .sorted("updatedAt", false);

  return results.map((item: any) => mapRealmObjectToLocalWorkOrder(item));
}

async function markAsSynced(id: string, remoteData?: WorkOrder) {
  const realm = await getRealm();

  realm.write(() => {
    const item = realm.objectForPrimaryKey<any>("WorkOrder", id);
    if (!item) return;

    if (remoteData) {
      applyRemoteToRealmObject(item, remoteData);
      return;
    }

    item.dirty = false;
    item.syncStatus = "synced";
    item.pendingAction = null;
  });
}

async function markAsError(id: string) {
  const realm = await getRealm();

  realm.write(() => {
    const item = realm.objectForPrimaryKey<any>("WorkOrder", id);
    if (!item) return;

    item.syncStatus = "error";
  });
}

async function removeLocalItem(id: string) {
  const realm = await getRealm();

  realm.write(() => {
    const item = realm.objectForPrimaryKey<any>("WorkOrder", id);
    if (item) {
      realm.delete(item);
    }
  });
}

async function pushLocalChanges() {
  const pendingItems = await getPendingItems();

  for (const item of pendingItems) {
    try {
      if (item.pendingAction === "create") {
        const created = await WorkOrdersAPI.create({
          title: item.title,
          description: item.description,
          assignedTo: item.assignedTo,
        });

        let finalRemote = created;

        const localStatusNeedsUpdate =
          item.status !== "Pending" ||
          item.completed !== false ||
          item.deleted !== false ||
          !!item.deletedAt;

        if (localStatusNeedsUpdate) {
          finalRemote = await WorkOrdersAPI.update(normalizeId(created.id), {
            title: item.title,
            description: item.description,
            assignedTo: item.assignedTo,
            status: item.status,
            completed: item.completed,
            deleted: item.deleted,
            deletedAt: item.deletedAt,
          });
        }

        const realm = await getRealm();

        const normalized = mapDTOToLocalWorkOrder({
          ...finalRemote,
          id: normalizeId(finalRemote.id),
        });

        realm.write(() => {
          const oldItem = realm.objectForPrimaryKey<any>("WorkOrder", item.id);

          if (oldItem) {
            realm.delete(oldItem);
          }

          realm.create("WorkOrder", normalized, Realm.UpdateMode.Modified);
        });

        continue;
      }

      if (item.pendingAction === "update") {
        const updated = await WorkOrdersAPI.update(item.id, {
          title: item.title,
          description: item.description,
          status: item.status,
          assignedTo: item.assignedTo,
          completed: item.completed,
          deleted: item.deleted,
          deletedAt: item.deletedAt,
        });

        await markAsSynced(item.id, {
          ...updated,
          id: normalizeId(updated.id),
        });

        continue;
      }

      if (item.pendingAction === "delete") {
        await WorkOrdersAPI.delete(item.id);
        await removeLocalItem(item.id);
        continue;
      }

      await markAsSynced(item.id);
    } catch {
      await markAsError(item.id);
    }
  }
}

async function pullRemoteChanges() {
  const since = (await getLastSyncAtFromRealm()) ?? "1970-01-01T00:00:00.000Z";
  const syncResponse = await WorkOrdersAPI.sync(since);
  const realm = await getRealm();

  realm.write(() => {
    syncResponse.created.forEach((item) => {
      const normalized = mapDTOToLocalWorkOrder({
        ...item,
        id: normalizeId(item.id),
      });

      const existing = realm.objectForPrimaryKey<any>(
        "WorkOrder",
        normalized.id,
      );

      if (!existing) {
        realm.create("WorkOrder", normalized, Realm.UpdateMode.Modified);
        return;
      }

      const localItem = mapRealmObjectToLocalWorkOrder(existing);
      const resolution = resolveWorkOrderConflict(localItem, normalized);

      applyConflictResolution(realm, existing, resolution);
    });

    syncResponse.updated.forEach((item) => {
      const normalized = mapDTOToLocalWorkOrder({
        ...item,
        id: normalizeId(item.id),
      });

      const existing = realm.objectForPrimaryKey<any>(
        "WorkOrder",
        normalized.id,
      );

      if (!existing) {
        realm.create("WorkOrder", normalized, Realm.UpdateMode.Modified);
        return;
      }

      const localItem = mapRealmObjectToLocalWorkOrder(existing);
      const resolution = resolveWorkOrderConflict(localItem, normalized);

      applyConflictResolution(realm, existing, resolution);
    });

    syncResponse.deleted.forEach((deletedId) => {
      const normalizedId = normalizeId(deletedId);
      const existing = realm.objectForPrimaryKey<any>(
        "WorkOrder",
        normalizedId,
      );

      if (!existing) return;

      const localItem = mapRealmObjectToLocalWorkOrder(existing);

      const remoteDeletedVersion: WorkOrder = {
        id: normalizedId,
        title: localItem.title,
        description: localItem.description,
        status: localItem.status,
        assignedTo: localItem.assignedTo,
        createdAt: localItem.createdAt,
        updatedAt: getNowIso(),
        deletedAt: getNowIso(),
        completed: localItem.completed,
        deleted: true,
      };

      const resolution = resolveWorkOrderConflict(
        localItem,
        remoteDeletedVersion,
      );

      applyConflictResolution(realm, existing, resolution);
    });
  });

  await setLastSyncAtInRealm(getNowIso());
}

export async function runSync(): Promise<void> {
  await pushLocalChanges();
  await pullRemoteChanges();
}

export async function getLastSyncAt(): Promise<string | null> {
  return getLastSyncAtFromRealm();
}
