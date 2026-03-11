import { PendingAction, WorkOrder, WorkOrderSyncStatus } from "./types";

export type LocalWorkOrder = WorkOrder & {
  dirty: boolean;
  syncStatus: WorkOrderSyncStatus;
  pendingAction: PendingAction;
};
