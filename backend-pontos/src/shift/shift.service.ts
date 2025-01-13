import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from 'src/entities/shift.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}
  // Método para criar um novo turno
  async createShift(shiftData: Partial<Shift>): Promise<Shift> {
    const newShift = this.shiftRepository.create(shiftData);
    return await this.shiftRepository.save(newShift);
  }

  // Método para buscar um turno pelo ID
  async findShiftById(id: number): Promise<Shift> {
    return await this.shiftRepository.findOne({ where: { id } });
  }

  // Método para listar todos os turnos

  async findAllShifts(): Promise<Shift[]> {
    return await this.shiftRepository.find();
  }
  // Método para atualizar um turno existente
  async updateShift(id: number, updateData: Partial<Shift>): Promise<Shift> {
    await this.shiftRepository.update(id, updateData);
    return await this.findShiftById(id);
  }

  // Método para deletar um turno
  async deleteShift(id: number): Promise<void> {
    await this.shiftRepository.delete(id);
  }
}
