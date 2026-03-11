import { WorkOrder } from "@/data/realm/schema/workOrder.schema";
import { LocalWorkOrder } from "@/domain/workOrders/localWorkOrder";
import {
  PendingAction,
  WorkOrderStatus,
  WorkOrderSyncStatus,
} from "@/domain/workOrders/types";
import { WorkOrderDTO } from "@/dtos/workOrder.dto";

export function normalizeId(id: string | number): string {
  return String(id);
}

export function mapDTOToLocalWorkOrder(dto: WorkOrderDTO): LocalWorkOrder {
  return {
    ...dto,
    id: normalizeId(dto.id),
    dirty: false,
    syncStatus: "synced",
    pendingAction: null,
  };
}

export function mapRealmWorkOrder(item: WorkOrder): LocalWorkOrder {
  return {
    id: String(item.id),
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
    pendingAction: (item.pendingAction ?? null) as PendingAction,
  };
}
