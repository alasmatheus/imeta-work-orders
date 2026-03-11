import Realm from "realm";

import {
  mapDTOToLocalWorkOrder,
  mapRealmWorkOrder,
  normalizeId,
} from "@/data/realm/mappers";
import { getRealm } from "@/data/realm/realm";
import { LocalWorkOrder } from "@/domain/workOrders/localWorkOrder";
import { WorkOrdersAPI } from "@/services/workOrders.api";

export async function getLocalWorkOrders(): Promise<LocalWorkOrder[]> {
  const realm = await getRealm();

  const results = realm
    .objects("WorkOrder")
    .filtered("deleted == false")
    .sorted("updatedAt", true);

  return results.map((item) => mapRealmWorkOrder(item));
}

export async function getLocalWorkOrderById(
  id: string,
): Promise<LocalWorkOrder | null> {
  const realm = await getRealm();
  const item = realm.objectForPrimaryKey<any>("WorkOrder", id);

  if (!item || item.deleted) return null;

  return mapRealmWorkOrder(item);
}

export async function fetchAndCacheWorkOrders(): Promise<LocalWorkOrder[]> {
  const apiItems = await WorkOrdersAPI.getAll();
  const realm = await getRealm();

  realm.write(() => {
    apiItems.forEach((item) => {
      const normalized = mapDTOToLocalWorkOrder({
        ...item,
        id: normalizeId(item.id),
      } as any);

      const existing = realm.objectForPrimaryKey<any>(
        "WorkOrder",
        normalized.id,
      );

      if (existing?.dirty) {
        return;
      }

      realm.create("WorkOrder", normalized, Realm.UpdateMode.Modified);
    });
  });

  const results = realm
    .objects("WorkOrder")
    .filtered("deleted == false")
    .sorted("updatedAt", true);

  return results.map((item) => mapRealmWorkOrder(item));
}

export async function fetchAndCacheWorkOrderById(
  id: string,
): Promise<LocalWorkOrder | null> {
  const apiItem = await WorkOrdersAPI.getById(id);
  const realm = await getRealm();
  const normalizedId = normalizeId((apiItem as any).id);

  realm.write(() => {
    const existing = realm.objectForPrimaryKey<any>("WorkOrder", normalizedId);

    if (existing?.dirty) return;

    const localItem = mapDTOToLocalWorkOrder({
      ...apiItem,
      id: normalizedId,
    } as any);

    realm.create("WorkOrder", localItem, Realm.UpdateMode.Modified);
  });

  const savedItem = realm.objectForPrimaryKey<any>("WorkOrder", normalizedId);

  if (!savedItem || savedItem.deleted) return null;

  return mapRealmWorkOrder(savedItem);
}
