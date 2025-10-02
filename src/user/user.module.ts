import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoyaltyModule } from '../loyalty/loyalty.module';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoyaltyModule, AdminModule],
  controllers: [UserController],
  providers: [UserService, AdminOnlyGuard],
})
export class UserModule {}
