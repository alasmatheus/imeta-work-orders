import { WorkOrder } from "@/domain/workOrders/types";
import { api } from "./api";

export const WorkOrdersAPI = {
  async getAll(): Promise<WorkOrder[]> {
    const { data } = await api.get<WorkOrder[]>("/work-orders");
    return data;
  },

  async getById(id: string): Promise<WorkOrder> {
    const { data } = await api.get<WorkOrder>(`/work-orders/${id}`);
    return data;
  },

  async create(payload: {
    title: string;
    description: string;
    assignedTo: string;
  }): Promise<WorkOrder> {
    const { data } = await api.post<WorkOrder>("/work-orders", payload);
    return data;
  },

  async update(id: string, payload: Partial<WorkOrder>): Promise<WorkOrder> {
    const { data } = await api.put<WorkOrder>(`/work-orders/${id}`, payload);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/work-orders/${id}`);
  },

  async sync(since: string): Promise<{
    created: WorkOrder[];
    updated: WorkOrder[];
    deleted: number[];
  }> {
    const { data } = await api.get("/work-orders/sync", {
      params: { since },
    });

    return data;
  },
};
