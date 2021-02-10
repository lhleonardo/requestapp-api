import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashProvider } from 'src/providers/hash';
import { UsersController } from './user.controller';
import UserRepository from './user.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService, HashProvider],
})
export class UsersModule {}
