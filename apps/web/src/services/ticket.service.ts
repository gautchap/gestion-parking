import { ticketSchema } from "@repo/schemas/index";
import { request } from "./fetcher";

const url = import.meta.env.VITE_API_URL;

export const getTicket = async () =>
    await request(`${url}/place/getTicket`, {
        zodSchema: ticketSchema,
    });
