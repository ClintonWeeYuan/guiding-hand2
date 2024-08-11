import { Request as ExpRequest } from 'express'
import { Body, Controller, Get, Middlewares, Post, Request, Route } from 'tsoa'

import { authToken } from '../middlewares/userMiddleware'
import {
  User,
  UserCreationParams,
  UserInformation,
  UserLoginParams,
  UsersService,
} from '../service/usersService'

const usersService = new UsersService()

@Route('users')
export class UsersController extends Controller {
  @Get('')
  @Middlewares(authToken)
  public async getUser(@Request() req: ExpRequest): Promise<UserInformation> {
    const payload = req.res?.locals.jwtDecoded
    const id = payload.userId

    return usersService.getById(id)
  }

  @Post('')
  public async createUser(
    @Body() requestBody: UserCreationParams,
  ): Promise<number> {
    return usersService.create(requestBody)
  }

  @Post('login')
  public async loginUser(
    @Body() requestBody: UserLoginParams,
  ): Promise<User & UserInformation & { token: string }> {
    return usersService.login(requestBody)
  }
}
