import { LocalWorkOrder } from "@/domain/workOrders/localWorkOrder";
import {
  WorkOrderStatus,
  WorkOrderSyncStatus,
} from "@/domain/workOrders/types";
import { WorkOrderDTO } from "@/dtos/workOrder.dto";

export function mapDTOToLocalWorkOrder(dto: WorkOrderDTO): LocalWorkOrder {
  return {
    ...dto,
    dirty: false,
    syncStatus: "synced",
  };
}

export function mapRealmWorkOrder(item: any): LocalWorkOrder {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    status: item.status as WorkOrderStatus,
    assignedTo: item.assignedTo,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,
    completed: item.completed,
    deleted: item.deleted,
    dirty: item.dirty,
    syncStatus: item.syncStatus as WorkOrderSyncStatus,
  };
}
