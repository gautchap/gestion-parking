/* global process */
import { z } from "@repo/schemas/index";

export const envSchemaFront = z.object({
    VITE_API_URL: z.string().url(),
    PORT: z.number().default(5173),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const envServer = envSchemaFront.safeParse({
    VITE_API_URL: process.env.VITE_API_URL,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
});

if (!envServer.success) {
    throw new Error("There is an error with the server environment variables");
}

export type EnvSchemaFrontType = z.infer<typeof envSchemaFront>;
