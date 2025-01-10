import { Module } from '@nestjs/common';
import { WorkHoursController } from './workhours.controller';
import { WorkHoursService } from './workhours.service';
import { WorkHours } from '../entities/workhours.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WorkHours])],
  controllers: [WorkHoursController],
  providers: [WorkHoursService],
})
export class WorkhoursModule {}
