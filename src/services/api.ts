import axios from "axios";
import { BASE_URL } from "../config";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
  }
}

api.interceptors.response.use(
  (response: any) => response,
  (error: {
    response: { data: { message: any }; status: number | undefined };
  }) => {
    throw new ApiError(
      error.response?.data?.message || "API Error",
      error.response?.status,
    );
  },
);

export { api };

