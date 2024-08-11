import dotenv from 'dotenv'
import { Kysely } from 'kysely'

import { setupDb } from '../db/setup'
import { DB } from '../db/types'

dotenv.config({ override: true })

export class BaseService {
  constructor(db?: Kysely<DB>) {
    if (db !== undefined) {
      this.db = db
    } else {
      this.db = setupDb()
    }
  }

  protected db: Kysely<DB>
}
