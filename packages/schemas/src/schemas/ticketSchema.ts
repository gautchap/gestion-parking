import { z } from "zod";

export const idStringSchema = z.string().uuid();
export const idNumberSchema = z.coerce.number().min(1);

export const ticketSchema = z.object({
    ticketId: idStringSchema,
    placeId: idNumberSchema,
});

export type Ticket = z.infer<typeof ticketSchema>;
