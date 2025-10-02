import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Flight]), AdminModule],
  providers: [FlightService, AdminOnlyGuard],
  controllers: [FlightController],
})
export class FlightModule {}
