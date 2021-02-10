import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import CreateUserRequest from './dtos/create-user-request.dto';
import ResponseUserDTO from './dtos/response-user.dto';
import User from './user.entity';

@Controller('admin')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  public async find(): Promise<User[]> {
    const users = await this.adminService.getAll();

    return users;
  }

  @Post()
  public async create(
    @Body() { name, email, password, confirmPassword }: CreateUserRequest,
  ): Promise<ResponseUserDTO> {
    if (password !== confirmPassword) {
      throw new UnprocessableEntityException('As senhas não conferem');
    }

    const createdUser = await this.adminService.createUser({
      name,
      email,
      password,
    });

    return createdUser;
  }
}
