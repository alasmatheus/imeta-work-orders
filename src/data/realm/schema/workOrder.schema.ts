import Realm from "realm";

export class WorkOrder extends Realm.Object<WorkOrder> {
  id!: string;
  title!: string;
  description!: string;
  status!: string;
  assignedTo!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt?: string;

  completed: boolean = false;
  deleted: boolean = false;

  dirty: boolean = false;
  syncStatus: string = "synced";
  pendingAction?: string;

  static primaryKey = "id";
}
