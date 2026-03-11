import Realm from "realm";

import { mapDTOToLocalWorkOrder, normalizeId } from "@/data/realm/mappers";
import { getRealm } from "@/data/realm/realm";
import { LocalWorkOrder } from "@/domain/workOrders/localWorkOrder";
import { WorkOrdersAPI } from "@/services/workOrders.api";

const LAST_SYNC_KEY = "lastSyncAt";

function getNowIso() {
  return new Date().toISOString();
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

  return results.map((item: any) => ({
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
  }));
}

async function markAsSynced(id: string, remoteData?: any) {
  const realm = await getRealm();

  realm.write(() => {
    const item = realm.objectForPrimaryKey<any>("WorkOrder", id);
    if (!item) return;

    if (remoteData) {
      item.title = remoteData.title;
      item.description = remoteData.description;
      item.status = remoteData.status;
      item.assignedTo = remoteData.assignedTo;
      item.createdAt = remoteData.createdAt;
      item.updatedAt = remoteData.updatedAt;
      item.deletedAt = remoteData.deletedAt;
      item.completed = remoteData.completed;
      item.deleted = remoteData.deleted;
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
          finalRemote = await WorkOrdersAPI.update(created.id, {
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
          const oldItem = realm.objectForPrimaryKey("WorkOrder", item.id);

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
          id: normalizeId((updated as any).id),
        });

        continue;
      }

      if (item.pendingAction === "delete") {
        await WorkOrdersAPI.delete(item.id);
        await removeLocalItem(item.id);
        continue;
      }

      await markAsSynced(item.id);
    } catch (error: any) {
      await markAsError(item.id);
    }
  }
}

async function pullRemoteChanges() {
  const since = (await getLastSyncAtFromRealm()) ?? "1970-01-01T00:00:00.000Z";
  const syncResponse = await WorkOrdersAPI.sync(since);
  const realm = await getRealm();

  realm.write(() => {
    syncResponse.created.forEach((item: any) => {
      const normalized = mapDTOToLocalWorkOrder({
        ...item,
        id: normalizeId(item.id),
      });

      const existing = realm.objectForPrimaryKey<any>(
        "WorkOrder",
        normalized.id,
      );

      if (existing?.dirty) return;

      realm.create("WorkOrder", normalized, Realm.UpdateMode.Modified);
    });

    syncResponse.updated.forEach((item: any) => {
      const normalized = mapDTOToLocalWorkOrder({
        ...item,
        id: normalizeId(item.id),
      });

      const existing = realm.objectForPrimaryKey<any>(
        "WorkOrder",
        normalized.id,
      );

      if (existing?.dirty) {
        const localUpdatedAt = new Date(existing.updatedAt).getTime();
        const remoteUpdatedAt = new Date(normalized.updatedAt).getTime();

        if (remoteUpdatedAt > localUpdatedAt) {
          existing.title = normalized.title;
          existing.description = normalized.description;
          existing.status = normalized.status;
          existing.assignedTo = normalized.assignedTo;
          existing.createdAt = normalized.createdAt;
          existing.updatedAt = normalized.updatedAt;
          existing.deletedAt = normalized.deletedAt;
          existing.completed = normalized.completed;
          existing.deleted = normalized.deleted;
          existing.dirty = false;
          existing.syncStatus = "synced";
          existing.pendingAction = null;
        }

        return;
      }

      realm.create("WorkOrder", normalized, Realm.UpdateMode.Modified);
    });

    syncResponse.deleted.forEach((deletedId: string | number) => {
      const normalizedId = normalizeId(deletedId);
      const existing = realm.objectForPrimaryKey<any>(
        "WorkOrder",
        normalizedId,
      );

      if (!existing) return;
      if (existing.dirty) return;

      realm.delete(existing);
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
