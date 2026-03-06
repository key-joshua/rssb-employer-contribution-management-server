import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index, Unique } from 'typeorm';
import { ContributionLine } from '../contribution-line/contribution-line.entity';
import { Employer } from '../employer/employer.entity';

export enum DeclarationStatus { DRAFT = 'draft', SUBMITTED = 'submitted', VALIDATED = 'validated', REJECTED = 'rejected'}

@Entity('declarations')
@Unique(['paymentNumber'])
@Unique(['employer', 'period'])
export class Declaration {
  @ManyToOne(() => Employer, employer => employer.declarations, { onDelete: 'CASCADE' })
  @Index()
  employer!: Employer;

  @OneToMany(() => ContributionLine, line => line.declaration, { cascade: true })
  contributionLines!: ContributionLine[];

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  paymentNumber!: string;

  @Index()
  @Column({ type: 'varchar', length: 7 })
  period!: string;

  @Index()
  @Column({ type: 'enum', enum: DeclarationStatus, default: DeclarationStatus.DRAFT })
  status!: DeclarationStatus;

  @Column({ type: 'timestamp', nullable: true })
  submittedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
