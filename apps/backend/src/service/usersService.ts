import bcrypt from 'bcrypt'

import { validatePassword } from '../utilities/passwords'
import { createToken } from '../utilities/security'
import { BaseService } from './baseService'

export interface User {
  id: number
  userRole: string | null
  email: string | null
  password: string | null
}

export interface UserCreationParams {
  firstName?: string
  lastName?: string
  email: string
  password: string
  userRole: 'USER' | 'ADMIN'
}

export interface UserInformation {
  id: number
  userId: number | null
  firstName: string | null
  lastName: string | null
}

export interface UserLoginParams {
  email: string
  password: string
}

export type Payload = {
  userId: number
  firstName: string
  lastName: string
  iat: number
  exp: number
}

const SALT_ROUNDS = 10

export class UsersService extends BaseService {
  public async getById(id: number): Promise<UserInformation> {
    try {
      return await this.db
        .selectFrom('userInformation')
        .selectAll('userInformation')
        .where('userId', '=', id)
        .executeTakeFirstOrThrow()
    } catch (e) {
      console.log(e)
      throw Error('Something went wrong')
    }
  }

  public async create(userCreationParams: UserCreationParams): Promise<number> {
    const { firstName, lastName, userRole, password, email } =
      userCreationParams

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    try {
      const newUser = await this.db
        .insertInto('users')
        .values({ userRole: userRole, email: email, password: hashedPassword })
        .returning(['users.id'])
        .executeTakeFirstOrThrow()

      await this.db
        .insertInto('userInformation')
        .values({
          userId: newUser.id,
          firstName: firstName || '',
          lastName: lastName || '',
        })
        .execute()

      return newUser.id
    } catch (error) {
      console.log(error)
      throw Error('Something went wrong when trying to create a new user')
    }
  }

  public async login(
    userLoginParams: UserLoginParams,
  ): Promise<User & UserInformation & { token: string }> {
    const { email, password } = userLoginParams
    try {
      const userLogin = await this.db
        .selectFrom('users')
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirstOrThrow()

      if (!userLogin.password) {
        throw Error('Invalid user/email combination')
      }

      const { id, password: hashedPassword } = userLogin

      const isValid = await validatePassword(
        password.toString(),
        hashedPassword,
      )

      if (!isValid) {
        throw Error('Invalid user/email combination')
      }

      const currentUser = await this.db
        .selectFrom('users')
        .innerJoin('userInformation', 'users.id', 'userInformation.userId')
        .selectAll()
        .where('users.id', '=', id)
        .executeTakeFirstOrThrow()

      if (!currentUser.userId) {
        throw Error('User does not exist')
      }

      const payload = {
        userId: currentUser.userId,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      }

      const token = await createToken(payload)

      return { ...currentUser, token }
    } catch (e) {
      throw Error(`Something went wrong when trying to search for user: ${e}`)
    }
  }
}
