import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { City } from '../cities/entities/city.entity';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Country, City]), AdminModule],
  controllers: [CountryController],
  providers: [CountryService, AdminOnlyGuard],
  exports: [CountryService],
})
export class CountryModule {}
