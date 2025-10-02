import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Airport } from '../airports/entities/airport.entity';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([City, Airport]), AdminModule],
  controllers: [CityController],
  providers: [CityService, AdminOnlyGuard],
  exports: [CityService],
})
export class CityModule {}
