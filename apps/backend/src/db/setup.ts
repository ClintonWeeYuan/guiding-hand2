import dotenv from 'dotenv'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import { DB } from './types'

dotenv.config({ override: true })

if (!process.env.DATABASE_URL) {
  throw new Error(`Database credentials error`)
}

export const setupDb = () => {
  if (process.env.DATABASE_URL) {
    return new Kysely<DB>({
      dialect: new PostgresDialect({
        pool: new Pool({
          connectionString: process.env.DATABASE_URL,
        }),
      }),
      plugins: [new CamelCasePlugin()],
    })
  } else {
    throw new Error('Invalid database url')
  }
}
