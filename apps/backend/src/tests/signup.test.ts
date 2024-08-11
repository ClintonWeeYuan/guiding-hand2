import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Kysely } from 'kysely'

import { DB, UserRole } from '../db/types'
import { UsersService } from '../service/usersService'
import { initializeContainer, initializeDatabase } from './fixtures/db'

let container: StartedPostgreSqlContainer
let db: Kysely<DB>

beforeEach(async () => {
  container = await initializeContainer()
  db = await initializeDatabase(container)
}, 20000)

afterEach(async () => {
  await db.destroy()
  await container.stop()
}, 20000)

describe('Signing up as a new user', () => {
  test('works when pass in correct parameters', async () => {
    const userService = new UsersService(db)

    await userService.create({
      email: '123@example.com',
      password: '123',
      userRole: 'ADMIN',
    })

    const checkUser = await db
      .selectFrom('users')
      .selectAll()
      .executeTakeFirstOrThrow()

    expect(checkUser).toBeDefined()
    expect(checkUser.email).toBe('123@example.com')
    expect(checkUser.userRole).toBe('ADMIN')
    expect(checkUser.password).not.toBe('123')
  })

  test('throws an error when email already exists', async () => {
    const userService = new UsersService(db)

    const duplicateUser = {
      email: '123@example.com',
      password: '123',
      userRole: 'ADMIN' as UserRole,
    }

    await userService.create(duplicateUser)

    await expect(userService.create(duplicateUser)).rejects.toThrow()
  })
})
