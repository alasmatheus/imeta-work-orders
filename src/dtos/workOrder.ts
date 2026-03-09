export type WorkOrderStatus = "Pending" | "In Progress" | "Completed";

export type workOrderDTO = {
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
