import { neon } from '@neondatabase/serverless'

process.loadEnvFile()

export const sql = neon(process.env.DATABASE_URL);
