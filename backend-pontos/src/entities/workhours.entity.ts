import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('work_hours')
export class WorkHours {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, employee => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'interval' })
  hoursWorked: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
