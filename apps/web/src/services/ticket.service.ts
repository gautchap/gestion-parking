import type { Ticket } from "@repo/schemas/index";
import { ticketSchema } from "@repo/schemas/index";
import { apiUrl, request } from "./fetcher";

export const getTicket = async () =>
    await request(`${apiUrl}/place/getTicket`, {
        zodSchema: ticketSchema,
    });

export const deleteTicket = async (ticket: Ticket) =>
    await request(`${apiUrl}/place/removeTicket`, {
        method: "PUT",
        data: ticket,
    });
