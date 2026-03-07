import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToOne } from 'typeorm';
import { Employer } from '../employer/employer.entity';

export enum Role { EMPLOYER = 'employer', ADMIN = 'admin' }

@Entity('users')
@Unique(['email'])
export class User {
  @OneToOne(() => Employer, employer => employer.user, { nullable: true })
  employer?: Employer;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: Role, default: Role.EMPLOYER })
  role!: Role;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

