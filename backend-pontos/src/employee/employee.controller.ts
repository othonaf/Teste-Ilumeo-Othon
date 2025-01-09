import {
  Controller,
  Post,
  Body,
  Logger,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from 'src/entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name);

  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createUser(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    try {
      this.logger.log(
        `Tentativa de criar usuário com CPF: ${createEmployeeDto.cpf}`,
      );
      const user = await this.employeeService.createUser(createEmployeeDto);
      this.logger.log(`Usuário criado com sucesso: ${user.cpf}`);
      return user;
    } catch (error) {
      this.logger.error(`Erro ao criar usuário: ${error.message}`);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string): Promise<Employee> {
    try {
      this.logger.log(`Buscando usuário com CPF: ${cpf}`);
      return await this.employeeService.findUserByCpf(cpf);
    } catch (error) {
      this.logger.error(`Erro ao buscar usuário: ${error.message}`);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
