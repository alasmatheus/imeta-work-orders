import { WorkOrderStatus } from "@/domain/workOrders/types";

export type WorkOrderDTO = {
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
};
