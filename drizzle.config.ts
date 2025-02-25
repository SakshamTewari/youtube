import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

// if (!process.env.DATABASE_URL) {
//   throw new Error('❌ DATABASE_URL is not set in the environment variables.');
// }

export default defineConfig({
  out: './drizzle/migrations/',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, //'postgres://user:password@localhost:5432/db'  : ensure 'localhost' is present if hardcoded
  },
});
