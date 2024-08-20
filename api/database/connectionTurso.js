import { config } from 'dotenv'
import { createClient } from '@libsql/client'

config()

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
})
