import { EnvSchemaType } from './src/utils/envSchema';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvSchemaType {}
  }
}
