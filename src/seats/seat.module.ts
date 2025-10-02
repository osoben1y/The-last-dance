import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Plane } from '../planes/entities/plane.entity';
import { Class } from '../classes/entities/class.entity';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Plane, Class]), AdminModule],
  controllers: [SeatController],
  providers: [SeatService, AdminOnlyGuard],
  exports: [SeatService],
})
export class SeatModule {}
