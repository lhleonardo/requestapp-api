import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import CreateUserRequest from './dtos/create-user-request.dto';
import ResponseUserDTO from './dtos/response-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  public async create(
    @Body() { name, email, password, confirmPassword }: CreateUserRequest,
  ): Promise<ResponseUserDTO> {
    if (password !== confirmPassword) {
      throw new UnprocessableEntityException('As senhas não conferem');
    }
    const createdUser = await this.userService.createAdminUser({
      name,
      email,
      password,
    });

    return createdUser;
  }
}
