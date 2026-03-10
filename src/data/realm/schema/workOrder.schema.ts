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
  completed!: boolean;
  deleted!: boolean;
  dirty!: boolean;
  syncStatus!: string;

  static primaryKey = "id";
}
