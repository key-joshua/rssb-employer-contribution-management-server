import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, Index, Unique } from 'typeorm';
import { ContributionLine } from '../contribution-line/contribution-line.entity';
import { Employer } from '../employer/employer.entity';

@Entity('employees')
@Unique(['nationalId'])
export class Employee {
  @ManyToOne(() => Employer, employer => employer.employees, { onDelete: 'CASCADE' })
  @Index()
  employer!: Employer;

  @OneToMany(() => ContributionLine, line => line.employee)
  contributionLines!: ContributionLine[];

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  nationalId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @Column({ type: 'date' })
  hireDate!: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  grossSalary!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
