import { WorkOrder } from "@domain/workOrders/types";

export function mapRealmWorkOrder(item: any): WorkOrder {
  return {
    id: item.id,
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
  };
}
