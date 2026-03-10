import { WorkOrderDTO } from "@/dtos/workOrder.dto";
import { api } from "./api";

export const WorkOrdersAPI = {
  async getAll(): Promise<WorkOrderDTO[]> {
    const { data } = await api.get<WorkOrderDTO[]>("/work-orders");
    return data;
  },

  async getById(id: string): Promise<WorkOrderDTO> {
    const { data } = await api.get<WorkOrderDTO>(`/work-orders/${id}`);
    return data;
  },

  async create(payload: {
    title: string;
    description: string;
    assignedTo: string;
  }): Promise<WorkOrderDTO> {
    const { data } = await api.post<WorkOrderDTO>("/work-orders", payload);
    return data;
  },

  async update(
    id: string,
    payload: Partial<WorkOrderDTO>,
  ): Promise<WorkOrderDTO> {
    const { data } = await api.put<WorkOrderDTO>(`/work-orders/${id}`, payload);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/work-orders/${id}`);
  },

  async sync(since: string): Promise<{
    created: WorkOrderDTO[];
    updated: WorkOrderDTO[];
    deleted: number[];
  }> {
    const { data } = await api.get("/work-orders/sync", {
      params: { since },
    });

    return data;
  },
};
