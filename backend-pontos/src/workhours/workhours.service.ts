import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkHours } from '../entities/workhours.entity';
import { CreateWorkHoursDto } from '../dto/create-hours.dto';
import { UpdateWorkHoursDto } from '../dto/update-workHours.dto';

@Injectable()
export class WorkHoursService {
  constructor(
    @InjectRepository(WorkHours)
    private readonly workHoursRepository: Repository<WorkHours>,
  ) {}

  // Método para criar um novo registro de horas trabalhadas
  async createWorkHours(
    createWorkHoursDto: CreateWorkHoursDto,
  ): Promise<WorkHours> {
    const newWorkHours = this.workHoursRepository.create(createWorkHoursDto);
    return await this.workHoursRepository.save(newWorkHours);
  }

  // Método para buscar um registro de horas trabalhadas pelo ID
  async findWorkHoursById(id: number): Promise<WorkHours> {
    return await this.workHoursRepository.findOne({ where: { id } });
  }

  // Método para listar todos os registros de horas trabalhadas
  async findAllWorkHours(): Promise<WorkHours[]> {
    return await this.workHoursRepository.find();
  }

  // Método para atualizar um registro de horas trabalhadas existente
  async updateWorkHours(
    id: number,
    updateWorkHoursDto: UpdateWorkHoursDto,
  ): Promise<WorkHours> {
    await this.workHoursRepository.update(id, updateWorkHoursDto);
    return await this.findWorkHoursById(id);
  }

  // Método para deletar um registro de horas trabalhadas
  async deleteWorkHours(id: number): Promise<void> {
    await this.workHoursRepository.delete(id);
  }
}
