import Realm from "realm";

export class SyncMeta extends Realm.Object<SyncMeta> {
  key!: string;
  value!: string;

  static primaryKey = "key";
}
