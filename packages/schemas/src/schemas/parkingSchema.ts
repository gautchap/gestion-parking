import { z } from "zod";
import { idNumberSchema, idStringSchema } from "./ticketSchema";

const placeSchema = z.object({
    id: idNumberSchema,
    free: z.boolean(),
    ticket: idStringSchema.nullable(),
});

export const parkingSchema = z.object({
    id: idStringSchema,
    places: z.array(placeSchema),
});

export type Place = z.infer<typeof placeSchema>;
export type Parking = z.infer<typeof parkingSchema>;
