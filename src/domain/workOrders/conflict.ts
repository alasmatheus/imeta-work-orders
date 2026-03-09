import { WorkOrder } from "./types";

type ResolveConflictParams = {
  local: WorkOrder;
  remote: WorkOrder;
};

export function resolveWorkOrderConflict({
  local,
  remote,
}: ResolveConflictParams): WorkOrder {
  const localUpdatedAt = new Date(local.updatedAt).getTime();
  const remoteUpdatedAt = new Date(remote.updatedAt).getTime();

  if (remoteUpdatedAt > localUpdatedAt) {
    return {
      ...remote,
      dirty: false,
      syncStatus: "synced",
    };
  }

  return {
    ...local,
    dirty: true,
    syncStatus: "pending",
  };
}
