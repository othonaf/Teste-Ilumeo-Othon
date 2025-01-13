import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { Shift } from '../entities/shift.entity';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  async create(@Body() shiftData: Partial<Shift>): Promise<Shift> {
    return this.shiftService.createShift(shiftData);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Shift> {
    return this.shiftService.findShiftById(id);
  }

  @Get()
  async findAll(): Promise<Shift[]> {
    return this.shiftService.findAllShifts();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Shift>,
  ): Promise<Shift> {
    return this.shiftService.updateShift(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.shiftService.deleteShift(id);
  }
}
