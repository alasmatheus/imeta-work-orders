import { create } from "zustand";

import { mapRealmWorkOrder } from "@/data/realm/mappers";
import { getRealm } from "@/data/realm/realm";
import { LocalWorkOrder } from "@/domain/workOrders/localWorkOrder";
import {
  CreateWorkOrderPayload,
  UpdateWorkOrderPayload,
} from "@/domain/workOrders/payloads";
import {
  fetchAndCacheWorkOrderById,
  fetchAndCacheWorkOrders,
  getLocalWorkOrderById,
  getLocalWorkOrders,
} from "@/services/workOrders.service";

type WorkOrdersStore = {
  items: LocalWorkOrder[];
  selectedItem: LocalWorkOrder | null;
  loading: boolean;
  error: string | null;

  loadFromRealm: () => Promise<void>;
  loadFromApi: () => Promise<void>;
  loadWorkOrders: (isOnline: boolean) => Promise<void>;

  loadWorkOrderById: (
    id: string,
    isOnline: boolean,
  ) => Promise<LocalWorkOrder | null>;
  clearSelectedItem: () => void;

  createLocal: (input: CreateWorkOrderPayload) => Promise<void>;
  updateLocal: (id: string, input: UpdateWorkOrderPayload) => Promise<void>;
  softDeleteLocal: (id: string) => Promise<void>;
  clearError: () => void;
};

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useWorkOrdersStore = create<WorkOrdersStore>((set) => ({
  items: [],
  selectedItem: null,
  loading: false,
  error: null,

  clearError: () => set({ error: null }),
  clearSelectedItem: () => set({ selectedItem: null }),

  loadFromRealm: async () => {
    try {
      set({ loading: true, error: null });
      const items = await getLocalWorkOrders();
      set({ items, loading: false });
    } catch {
      set({
        loading: false,
        error: "Erro ao carregar ordens locais.",
      });
    }
  },

  loadFromApi: async () => {
    try {
      set({ loading: true, error: null });
      const items = await fetchAndCacheWorkOrders();
      set({ items, loading: false });
    } catch (error: any) {
      console.log("Erro real no loadFromApi:", error?.message);
      set({
        loading: false,
        error: "Erro ao carregar ordens da API.",
      });
    }
  },

  loadWorkOrders: async (isOnline: boolean) => {
    if (isOnline) {
      await useWorkOrdersStore.getState().loadFromApi();
      return;
    }

    await useWorkOrdersStore.getState().loadFromRealm();
  },

  loadWorkOrderById: async (id, isOnline) => {
    try {
      set({ loading: true, error: null });

      const item = isOnline
        ? await fetchAndCacheWorkOrderById(id)
        : await getLocalWorkOrderById(id);

      set({ selectedItem: item, loading: false });

      return item;
    } catch (error: any) {
      console.log("Erro ao carregar ordem por id:", error?.message);
      set({
        selectedItem: null,
        loading: false,
        error: "Erro ao carregar ordem de serviço.",
      });
      return null;
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

      set({
        items: results.map((item) => mapRealmWorkOrder(item)),
        error: null,
      });
    } catch {
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

      const updatedItem = realm.objectForPrimaryKey<any>("WorkOrder", id);

      const results = realm
        .objects("WorkOrder")
        .filtered("deleted == false")
        .sorted("updatedAt", true);

      set({
        items: results.map((item) => mapRealmWorkOrder(item)),
        selectedItem: updatedItem ? mapRealmWorkOrder(updatedItem) : null,
        error: null,
      });
    } catch {
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

      set({
        items: results.map((item) => mapRealmWorkOrder(item)),
        selectedItem: null,
        error: null,
      });
    } catch {
      set({ error: "Erro ao remover ordem de serviço localmente." });
    }
  },
}));
