import { WorkOrderStatus } from "./types";

export type CreateWorkOrderPayload = {
  title: string;
  description: string;
  status: WorkOrderStatus;
  assignedTo: string;
};

export type UpdateWorkOrderPayload = Partial<CreateWorkOrderPayload>;
