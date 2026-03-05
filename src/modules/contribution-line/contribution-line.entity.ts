import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index, Unique } from 'typeorm';
import { Declaration } from '../declaration/declaration.entity';
import { Employee } from '../employee/employee.entity';

@Entity('contribution_lines')
@Unique(['employee', 'declaration'])
export class ContributionLine {
  @ManyToOne(() => Employee, employee => employee.contributionLines, { onDelete: 'CASCADE' })
  @Index()
  employee!: Employee;

  @ManyToOne(() => Declaration, declaration => declaration.contributionLines, { onDelete: 'CASCADE' })
  @Index()
  declaration!: Declaration;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  grossSalary!: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  pensionAmount!: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  medicalAmount!: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  maternityAmount!: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  total!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
