import type { Ticket } from "@repo/schemas/index";
import { ticketSchema } from "@repo/schemas/index";
import { request } from "./fetcher";

export const getTicket = async () =>
    await request(`/api/place/getTicket`, {
        zodSchema: ticketSchema,
    });

export const deleteTicket = async (ticket: Ticket) =>
    await request(`/api/place/removeTicket`, {
        method: "PUT",
        data: ticket,
    });
