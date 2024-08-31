import type { Ticket } from "@repo/schemas/index";
import { ticketSchema } from "@repo/schemas/index";
import { request } from "./fetcher";

const url = import.meta.env.VITE_API_URL;

export const getTicket = async () =>
    await request(`${url}/place/getTicket`, {
        zodSchema: ticketSchema,
    });

export const deleteTicket = async (ticket: Ticket) =>
    await request(`${url}/place/removeTicket`, {
        method: "PUT",
        data: ticket,
    });
