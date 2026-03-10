import Realm from "realm";

import {
  mapDTOToLocalWorkOrder,
  mapRealmWorkOrder,
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

export async function fetchAndCacheWorkOrders(): Promise<LocalWorkOrder[]> {
  const apiItems = await WorkOrdersAPI.getAll();
  const realm = await getRealm();

  realm.write(() => {
    apiItems.forEach((item) => {
      const localItem = mapDTOToLocalWorkOrder(item);
      realm.create("WorkOrder", localItem, Realm.UpdateMode.Modified);
    });
  });

  const results = realm
    .objects("WorkOrder")
    .filtered("deleted == false")
    .sorted("updatedAt", true);

  return results.map((item) => mapRealmWorkOrder(item));
}
