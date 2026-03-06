import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, Index } from 'typeorm';
import { Declaration } from '../declaration/declaration.entity';
import { Employee } from '../employee/employee.entity';

export enum EmployerStatus { ACTIVE = 'active', SUSPENDED = 'suspended' }

@Entity('employers')
@Unique(['tin'])
export class Employer {
    @OneToMany(() => Employee, employee => employee.employer)
    employees!: Employee[];

    @OneToMany(() => Declaration, declaration => declaration.employer)
    declarations!: Declaration[];

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 50 })
    tin!: string;

    @Column({ type: 'varchar', length: 100 })
    sector!: string;

    @Index()
    @Column({ type: 'date' })
    registrationDate!: Date;

    @Index()
    @Column({ type: 'enum', enum: EmployerStatus, default: EmployerStatus.ACTIVE })
    status!: EmployerStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
