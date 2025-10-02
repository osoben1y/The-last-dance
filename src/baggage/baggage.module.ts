import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Baggage } from './entities/baggage.entity';
import { BaggageService } from './baggage.service';
import { BaggageController } from './baggage.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Baggage]), AdminModule],
  providers: [BaggageService, AdminOnlyGuard],
  controllers: [BaggageController],
  exports: [BaggageService],
})
export class BaggageModule {}
