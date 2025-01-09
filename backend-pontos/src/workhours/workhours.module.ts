import { Module } from '@nestjs/common';
import { WorkhoursController } from './workhours.controller';
import { WorkhoursService } from './workhours.service';

@Module({
  controllers: [WorkhoursController],
  providers: [WorkhoursService]
})
export class WorkhoursModule {}
