import { apiUrl, request } from "./fetcher";
import { parkingSchema } from "@repo/schemas/index";

export const getParking = async (signal: AbortSignal) =>
    await request(`${apiUrl}/parking/list`, { customConfig: { signal }, zodSchema: parkingSchema });
