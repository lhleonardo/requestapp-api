import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import CreateUserRequest from '../dtos/create-user-request.dto';
import ResponseUserDTO from '../dtos/response-user.dto';
import User from '../user.entity';
import { PayerService } from './payer.service';

@Controller('payer')
@UseInterceptors(ClassSerializerInterceptor)
export class PayerController {
  constructor(private readonly payerService: PayerService) {}

  @Get()
  public async get(): Promise<User[]> {
    const users = await this.payerService.getAll();

    return users;
  }

  @Post()
  public async create(
    @Body() { name, email, password, confirmPassword }: CreateUserRequest,
  ): Promise<ResponseUserDTO> {
    if (password !== confirmPassword) {
      throw new UnprocessableEntityException('As senhas não conferem');
    }

    const createdUser = await this.payerService.createUser({
      name,
      email,
      password,
    });

    return createdUser;
  }
}
