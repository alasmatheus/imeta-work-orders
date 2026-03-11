import { LocalWorkOrder } from "./localWorkOrder";
import { WorkOrder } from "./types";

export type ConflictResolution =
  | { type: "use_local" }
  | { type: "use_remote"; remote: WorkOrder }
  | { type: "delete_local" };

function safeTimestamp(value?: string | null): number {
  if (!value) return 0;

  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function resolveWorkOrderConflict(
  local: LocalWorkOrder,
  remote: WorkOrder | null,
): ConflictResolution {
  if (!remote) {
    return { type: "use_local" };
  }

  if (remote.deleted) {
    return { type: "delete_local" };
  }

  if (!local.dirty) {
    return { type: "use_remote", remote };
  }

  if (local.pendingAction === "delete") {
    return { type: "delete_local" };
  }

  const localUpdatedAt = safeTimestamp(local.updatedAt);
  const remoteUpdatedAt = safeTimestamp(remote.updatedAt);

  if (remoteUpdatedAt > localUpdatedAt) {
    return { type: "use_remote", remote };
  }

  return { type: "use_local" };
}
