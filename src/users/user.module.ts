import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashProvider } from 'src/providers/hash';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { UsersController } from './common/user.controller';
import { UsersService } from './common/users.service';
import UserRepository from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController, AdminController],
  providers: [UsersService, AdminService, HashProvider],
})
export class UsersModule {}
