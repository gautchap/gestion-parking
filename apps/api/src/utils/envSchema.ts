import { z } from '@repo/schemas';

export const envSchemaServer = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  PORT: z.number().default(3001),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

const envServer = envSchemaServer.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
});

if (!envServer.success) {
  throw new Error('There is an error with the server environment variables');
}

export type EnvSchemaServerType = z.infer<typeof envSchemaServer>;
