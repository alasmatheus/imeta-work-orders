import { LocalWorkOrder } from "@/domain/workOrders/localWorkOrder";
import { mapRealmWorkOrder } from "@data/realm/mappers";
import { getRealm } from "@data/realm/realm";
import { WorkOrderStatus } from "@domain/workOrders/types";

import { create } from "zustand";

type CreateWorkOrderInput = {
  title: string;
  description: string;
  status: WorkOrderStatus;
  assignedTo: string;
};

type UpdateWorkOrderInput = Partial<CreateWorkOrderInput>;

type WorkOrdersStore = {
  items: LocalWorkOrder[];
  loading: boolean;
  error: string | null;

  loadFromRealm: () => Promise<void>;
  createLocal: (input: CreateWorkOrderInput) => Promise<void>;
  updateLocal: (id: string, input: UpdateWorkOrderInput) => Promise<void>;
  softDeleteLocal: (id: string) => Promise<void>;
  clearError: () => void;
};

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useWorkOrdersStore = create<WorkOrdersStore>((set) => ({
  items: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  loadFromRealm: async () => {
    try {
      set({ loading: true, error: null });

      const realm = await getRealm();

      const results = realm
        .objects("WorkOrder")
        .filtered("deleted == false")
        .sorted("updatedAt", true);

      const items = results.map(mapRealmWorkOrder);

      set({ items, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: "Erro ao carregar ordens de serviço locais.",
      });
    }
  },

  createLocal: async (input) => {
    try {
      const realm = await getRealm();
      const now = new Date().toISOString();

      realm.write(() => {
        realm.create("WorkOrder", {
          id: generateId(),
          title: input.title,
          description: input.description,
          status: input.status,
          assignedTo: input.assignedTo,
          createdAt: now,
          updatedAt: now,
          completed: input.status === "Completed",
          deleted: false,
          dirty: true,
          syncStatus: "pending",
        });
      });

      const results = realm
        .objects("WorkOrder")
        .filtered("deleted == false")
        .sorted("updatedAt", true);

      set({ items: results.map(mapRealmWorkOrder), error: null });
    } catch (error) {
      set({ error: "Erro ao criar ordem de serviço localmente." });
    }
  },

  updateLocal: async (id, input) => {
    try {
      const realm = await getRealm();
      const now = new Date().toISOString();

      realm.write(() => {
        const item = realm.objectForPrimaryKey<any>("WorkOrder", id);

        if (!item) return;

        if (input.title !== undefined) item.title = input.title;
        if (input.description !== undefined)
          item.description = input.description;
        if (input.status !== undefined) {
          item.status = input.status;
          item.completed = input.status === "Completed";
        }
        if (input.assignedTo !== undefined) item.assignedTo = input.assignedTo;

        item.updatedAt = now;
        item.dirty = true;
        item.syncStatus = "pending";
      });

      const results = realm
        .objects("WorkOrder")
        .filtered("deleted == false")
        .sorted("updatedAt", true);

      set({ items: results.map(mapRealmWorkOrder), error: null });
    } catch (error) {
      set({ error: "Erro ao atualizar ordem de serviço localmente." });
    }
  },

  softDeleteLocal: async (id) => {
    try {
      const realm = await getRealm();
      const now = new Date().toISOString();

      realm.write(() => {
        const item = realm.objectForPrimaryKey<any>("WorkOrder", id);

        if (!item) return;

        item.deleted = true;
        item.deletedAt = now;
        item.updatedAt = now;
        item.dirty = true;
        item.syncStatus = "pending";
      });

      const results = realm
        .objects("WorkOrder")
        .filtered("deleted == false")
        .sorted("updatedAt", true);

      set({ items: results.map(mapRealmWorkOrder), error: null });
    } catch (error) {
      set({ error: "Erro ao remover ordem de serviço localmente." });
    }
  },
}));
