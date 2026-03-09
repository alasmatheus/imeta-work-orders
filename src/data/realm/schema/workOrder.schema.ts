import {
  WorkOrderStatus,
  WorkOrderSyncStatus,
} from "@/domain/workOrders/types";
import Realm from "realm";

export class WorkOrderSchema extends Realm.Object<WorkOrderSchema> {
  id!: string;
  title!: string;
  description!: string;
  status!: WorkOrderStatus;
  assignedTo!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt?: string;
  completed!: boolean;
  deleted!: boolean;
  dirty!: boolean;
  syncStatus!: WorkOrderSyncStatus;

  static primaryKey = "id";
}
