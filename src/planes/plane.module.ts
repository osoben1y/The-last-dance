import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plane } from './entities/plane.entity';
import { Company } from '../companies/entities/company.entity';
import { PlaneService } from './plane.service';
import { PlaneController } from './plane.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Plane, Company]), AdminModule],
  controllers: [PlaneController],
  providers: [PlaneService, AdminOnlyGuard],
  exports: [PlaneService],
})
export class PlaneModule {}
