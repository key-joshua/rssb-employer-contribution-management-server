import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Employee } from '../employee/employee.entity';
import { Employer } from '../employer/employer.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Declaration, DeclarationStatus } from './declaration.entity';
import { formatPaginationMetaUtil } from 'src/common/utils/pagination.util';
import { ContributionLine } from '../contribution-line/contribution-line.entity';

@Injectable()
export class DeclarationService {
    constructor(
        @InjectRepository(Declaration)
        private declarationRepository: Repository<Declaration>,

        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,

        @InjectRepository(ContributionLine)
        private contributionRepository: Repository<ContributionLine>,
    ) {}

    async findAll(pagination: PaginationDto) {
        const { page = Number(process.env.PAGE_NUMBER) || 1, limit = Number(process.env.PAGE_SIZE) || 10 } = pagination;
        const [rows, totalCount] = await this.declarationRepository.findAndCount({ relations: ['contributionLines'], skip: (page - 1) * limit, take: limit, order: { createdAt: 'DESC' } });

        const meta = formatPaginationMetaUtil(page, limit, totalCount);
        return { declarations: rows, meta };
    }

    async findByAttribute(attribute: Record<string, any>) {
        return await this.declarationRepository.findOne({ where: attribute, });
    }

    async create(data: Partial<Declaration>): Promise<Declaration> {
        const declaration = this.declarationRepository.create({ ...data, status: DeclarationStatus.DRAFT });
        return await this.declarationRepository.save(declaration);
    }

    async update(id: string, status: DeclarationStatus): Promise<Declaration> {
        await this.declarationRepository.update(id, { status });
        return await this.findByAttribute({ id }) as Declaration;
    }

    async findEmployerEmployees(employer: Employer) {
        return await this.employeeRepository.find({ where: { employer }});
    }

    async createContributionLines(data: Partial<ContributionLine>): Promise<ContributionLine> {
        const contributionLine = this.contributionRepository.create(data);
        return await this.contributionRepository.save(contributionLine);
    }

    async findEmployerDeclarations(employer: Employer,  pagination: PaginationDto)  {
        const { page = Number(process.env.PAGE_NUMBER) || 1, limit = Number(process.env.PAGE_SIZE) || 10 } = pagination;
        const [rows, totalCount] = await this.declarationRepository.findAndCount({  where: { employer }, relations: ['contributionLines'], skip: (page - 1) * limit, take: limit, order: { createdAt: 'DESC' } });

        const meta = formatPaginationMetaUtil(page, limit, totalCount);
        return { declarations: rows, meta };
    }
}
