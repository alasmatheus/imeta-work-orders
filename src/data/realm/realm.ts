import Realm from "realm";
import { SyncMeta } from "./schema/syncMeta.schema";
import { WorkOrder } from "./schema/workOrder.schema";

const realmConfig: Realm.Configuration = {
  schema: [WorkOrder, SyncMeta],
  schemaVersion: 2,
};

let realmInstance: Realm | null = null;

export async function getRealm() {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  realmInstance = await Realm.open(realmConfig);
  return realmInstance;
}
