import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Plane } from '../planes/entities/plane.entity';
import { Country } from '../countries/entities/country.entity';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Plane, Country]), AdminModule],
  controllers: [CompanyController],
  providers: [CompanyService, AdminOnlyGuard],
  exports: [CompanyService],
})
export class CompanyModule {}
