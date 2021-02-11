import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashProvider } from 'src/providers/hash';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { UsersController } from './common/user.controller';
import { UsersService } from './common/users.service';
import { ReviewerController } from './reviewer/reviewer.controller';
import { ReviewerService } from './reviewer/reviewer.service';
import { PayerController } from './payer/payer.controller';
import { PayerService } from './payer/payer.service';
import UserRepository from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController, AdminController, ReviewerController, PayerController],
  providers: [UsersService, AdminService, HashProvider, ReviewerService, PayerService],
})
export class UsersModule {}
