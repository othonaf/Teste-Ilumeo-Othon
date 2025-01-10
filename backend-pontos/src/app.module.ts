import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Shift } from './entities/shift.entity';
import { WorkHours } from './entities/workhours.entity';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';
import { ShiftModule } from './shift/shift.module';
import { WorkhoursModule } from './workhours/workhours.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, EmployeeModule, ShiftModule, WorkhoursModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Employee, Shift, WorkHours],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Employee, Shift, WorkHours]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class AppModule {}
