import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), AdminModule],
  controllers: [ReviewController],
  providers: [ReviewService, AdminOnlyGuard],
  exports: [ReviewService],
})
export class ReviewModule {}
