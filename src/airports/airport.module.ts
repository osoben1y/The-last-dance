import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './entities/airport.entity';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Airport]), AdminModule],
  controllers: [AirportController],
  providers: [AirportService, AdminOnlyGuard],
  exports: [AirportService],
})
export class AirportModule {}
