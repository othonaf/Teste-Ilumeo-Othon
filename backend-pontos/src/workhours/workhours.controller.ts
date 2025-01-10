import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WorkHoursService } from './workhours.service';
import { WorkHours } from '../entities/workhours.entity';
import { CreateWorkHoursDto } from '../dto/create-hours.dto';

@Controller('work-hours')
export class WorkHoursController {
  constructor(private readonly workHoursService: WorkHoursService) {}

  @Post()
  async create(
    @Body() createWorkHoursDto: CreateWorkHoursDto,
  ): Promise<WorkHours> {
    return this.workHoursService.createWorkHours(createWorkHoursDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<WorkHours> {
    return this.workHoursService.findWorkHoursById(id);
  }

  @Get()
  async findAll(): Promise<WorkHours[]> {
    return this.workHoursService.findAllWorkHours();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWorkHoursDto: Partial<WorkHours>,
  ): Promise<WorkHours> {
    return this.workHoursService.updateWorkHours(id, updateWorkHoursDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.workHoursService.deleteWorkHours(id);
  }
}
