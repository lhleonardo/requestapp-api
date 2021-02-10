import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashProvider } from 'src/providers/hash';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersController } from './user.controller';
import UserRepository from './user.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController, AdminController],
  providers: [UsersService, AdminService, HashProvider],
})
export class UsersModule {}
