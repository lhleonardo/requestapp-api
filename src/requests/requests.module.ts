import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import RequestRepository from './requests.repository';
import UserRepository from 'src/users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RequestRepository, UserRepository])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
