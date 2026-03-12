import { WorkOrderDTO } from "@/dtos/workOrder.dto";
import { api } from "./api";

export type SyncResponseDTO = {
  created: WorkOrderDTO[];
  updated: WorkOrderDTO[];
  deleted: Array<string | number>;
  serverTime: string | null;
};

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

  async sync(since: string): Promise<SyncResponseDTO> {
    const response = await api.get<{
      created: WorkOrderDTO[];
      updated: WorkOrderDTO[];
      deleted: Array<string | number>;
    }>("/work-orders/sync", {
      params: { since },
    });

    const headerDate = response.headers?.date;
    const serverTime =
      typeof headerDate === "string" &&
      !Number.isNaN(new Date(headerDate).getTime())
        ? new Date(headerDate).toISOString()
        : null;

    return {
      ...response.data,
      serverTime,
    };
  },
};
