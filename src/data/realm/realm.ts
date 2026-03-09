import Realm from "realm";
import { SyncMetaSchema } from "./schema/syncMeta.schema";
import { WorkOrderSchema } from "./schema/workOrder.schema";

export const realmConfig: Realm.Configuration = {
  schema: [WorkOrderSchema, SyncMetaSchema],
  schemaVersion: 1,
};

let realmInstance: Realm | null = null;

export async function getRealm() {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  realmInstance = await Realm.open(realmConfig);
  return realmInstance;
}
