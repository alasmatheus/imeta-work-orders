import { workOrderDTO } from "@/dtos/workOrder";
import { api } from "./api";

export const WorkOrdersAPI = {
  async getAll(): Promise<workOrderDTO[]> {
    const { data } = await api.get<workOrderDTO[]>("/work-orders");
    return data;
  },

  async getById(id: string): Promise<workOrderDTO> {
    const { data } = await api.get<workOrderDTO>(`/work-orders/${id}`);
    return data;
  },

  async create(payload: {
    title: string;
    description: string;
    assignedTo: string;
  }): Promise<workOrderDTO> {
    const { data } = await api.post<workOrderDTO>("/work-orders", payload);
    return data;
  },

  async update(
    id: string,
    payload: Partial<workOrderDTO>,
  ): Promise<workOrderDTO> {
    const { data } = await api.put<workOrderDTO>(`/work-orders/${id}`, payload);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/work-orders/${id}`);
  },

  async sync(since: string): Promise<{
    created: workOrderDTO[];
    updated: workOrderDTO[];
    deleted: number[];
  }> {
    const { data } = await api.get("/work-orders/sync", {
      params: { since },
    });

    return data;
  },
};
