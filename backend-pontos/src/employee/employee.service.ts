import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  private validateCpf(cpf: string): boolean {
    if (!cpf || cpf.length !== 11 || !cpf.match(/^\d+$/)) {
      return false;
    }
    if (new Set(cpf.split('')).size === 1) {
      return false;
    }
    return true;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async createUser(createUser: CreateEmployeeDto): Promise<Employee> {
    try {
      if (!this.validateCpf(createUser.cpf)) {
        throw new ConflictException('CPF inválido');
      }

      const existingUser = await this.employeeRepository.findOne({
        where: { cpf: createUser.cpf },
      });

      if (existingUser) {
        this.logger.warn(
          `Tentativa de criar usuário com CPF duplicado: ${createUser.cpf}`,
        );
        throw new ConflictException('Usuário já cadastrado');
      }

      const hashedPassword = await this.hashPassword(createUser.password);

      const dbUser = this.employeeRepository.create({
        ...createUser,
        password: hashedPassword,
      });

      const newUser = await this.employeeRepository.save(dbUser);
      this.logger.log(`Novo usuário criado com CPF: ${createUser.cpf}`);

      return newUser;
    } catch (error) {
      this.logger.error(`Erro ao criar usuário: ${error.message}`);
      throw error;
    }
  }

  async findUserByCpf(cpf: string): Promise<any> {
    try {
      const user = await this.employeeRepository.findOne({
        where: { cpf },
      });

      if (!user) {
        this.logger.warn(`Usuário com CPF ${cpf} não encontrado`);
        throw new NotFoundException('Usuário não encontrado');
      }

      const userFound = {
        name: user.name,
        cpf: user.cpf,
        email: user.email,
      };

      this.logger.debug(`Usuário encontrado: ${cpf}`);
      return userFound;
    } catch (error) {
      this.logger.error(`Erro ao buscar usuário: ${error.message}`);
      throw error;
    }
  }
}
