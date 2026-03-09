export type WorkOrderStatus = "Pending" | "In Progress" | "Completed";
export type WorkOrderSyncStatus = "synced" | "pending" | "error";

export type WorkOrder = {
  id: string;
  title: string;
  description: string;
  status: WorkOrderStatus;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  completed: boolean;
  deleted: boolean;
  dirty: boolean;
  syncStatus: WorkOrderSyncStatus;
};
