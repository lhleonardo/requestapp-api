import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from 'src/users/user.entity';
import UserRepository from 'src/users/user.repository';
import CreateRequestDTO from './dtos/create-request.dto';
import Request from './requests.entity';
import RequestRepository from './requests.repository';

import { isBefore } from 'date-fns';
import { RequestStatus } from './request-status.enum';

@Injectable()
export class RequestsService {
  constructor(
    private readonly repository: RequestRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async create(data: CreateRequestDTO): Promise<Request> {
    const { deadline, description, ownerId, value } = data;

    const owner = await this.userRepository.findOne(ownerId);

    if (!owner) {
      throw new BadRequestException('ownerId inválido');
    }

    if (owner.role === Role.payer) {
      throw new UnauthorizedException(
        'Usuários do tipo "pagadores" não podem criar solicitações',
      );
    }

    if (isBefore(deadline, new Date())) {
      throw new BadRequestException(
        'A data limite de pagamento deve ser futura',
      );
    }

    if (value <= 0) {
      throw new BadRequestException('O valor de pagamento deve ser positivo.');
    }

    const request = this.repository.create({
      description,
      ownerId,
      value,
      deadline,
      status: RequestStatus.created,
    });

    await this.repository.save(request);

    return request;
  }
}
