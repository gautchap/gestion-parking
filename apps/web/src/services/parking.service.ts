import { request } from "./fetcher";
import { parkingSchema } from "@repo/schemas/index";

export const getParking = async (signal: AbortSignal) =>
    await request(`/api/parking/list`, { customConfig: { signal }, zodSchema: parkingSchema });
