import { Body, Controller, Post } from '@nestjs/common';
import CreateRequestDTO from './dtos/create-request.dto';
import Request from './requests.entity';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestService: RequestsService) {}

  @Post()
  public async create(@Body() data: CreateRequestDTO): Promise<Request> {
    const { description, ownerId, deadline, value } = data;

    const createdRequest: Request = await this.requestService.create({
      description,
      ownerId,
      deadline,
      value,
    });

    return createdRequest;
  }
}
