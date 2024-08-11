import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import migrate from 'node-pg-migrate'
import { Pool } from 'pg'

import { DB } from '../../db/types'

export const initializeContainer = async () =>
  await new PostgreSqlContainer().start()

export const initializeDatabase = async (
  container: StartedPostgreSqlContainer,
) => {
  await migrate({
    databaseUrl: container.getConnectionUri(),
    dir: './src/db/migrations',
    direction: 'up',
    migrationsTable: 'pgmigrations',
  })

  return new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: container.getConnectionUri(),
      }),
    }),
    plugins: [new CamelCasePlugin()],
  })
}
