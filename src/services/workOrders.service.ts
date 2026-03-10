import Realm from "realm";

import { mapRealmWorkOrder } from "@/data/realm/mappers";
import { getRealm } from "@/data/realm/realm";
import { LocalWorkOrder } from "@/domain/workOrders/localWorkOrder";
import { WorkOrderDTO } from "@/dtos/workOrder.dto";
import { WorkOrdersAPI } from "@/services/workOrders.api";

function mapDTOToLocalWorkOrder(item: WorkOrderDTO): LocalWorkOrder {
  return {
    ...item,
    dirty: false,
    syncStatus: "synced",
  };
}

export async function getLocalWorkOrders(): Promise<LocalWorkOrder[]> {
  const realm = await getRealm();

  const results = realm
    .objects("WorkOrder")
    .filtered("deleted == false")
    .sorted("updatedAt", true);

  return results.map((item) => mapRealmWorkOrder(item));
}

export async function fetchAndCacheWorkOrders(): Promise<LocalWorkOrder[]> {
  try {
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

    const mapped = results.map((item) => mapRealmWorkOrder(item));

    return mapped;
  } catch (error: any) {
    throw error;
  }
}
