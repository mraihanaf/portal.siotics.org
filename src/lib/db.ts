import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as AuthSchema from '@/../auth-schema';
import * as DBSchema from "@/db/schema"

const schema = { ...AuthSchema, ...DBSchema };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const db = drizzle({ client: pool, schema: schema });

export default db;