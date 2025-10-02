import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Class]), AdminModule],
  controllers: [ClassController],
  providers: [ClassService, AdminOnlyGuard],
  exports: [ClassService],
})
export class ClassModule {}
