import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Employer } from './employer.entity';
import { EmployerStatus } from './employer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { formatPaginationMetaUtil } from 'src/common/utils/pagination.util';
import { CreateEmployerDto, UpdateEmployerDto } from 'src/common/dto/employer.dto';

@Injectable()
export class EmployerService {
    constructor( @InjectRepository(Employer) private employerRepository: Repository<Employer> ) {}

    async findAll(pagination: PaginationDto) {
        const { page = Number(process.env.PAGE_NUMBER) || 1, limit = Number(process.env.PAGE_SIZE) || 10 } = pagination;
        const [rows, totalCount] = await this.employerRepository.findAndCount({ where: { status: EmployerStatus.ACTIVE }, skip: (page - 1) * limit, take: limit });

        const meta = formatPaginationMetaUtil(page, limit, totalCount);
        return { employers: rows, meta };
    }

    async create(createEmployerDto: CreateEmployerDto) {
        const employer = this.employerRepository.create(createEmployerDto);
        return await this.employerRepository.save(employer);
    }

    async findByAttribute(attribute: Record<string, any>): Promise<Employer | null> {
        return await this.employerRepository.findOne({ where: { ...attribute, status: EmployerStatus.ACTIVE } });
    }

    async update(employer: Employer, updateData: UpdateEmployerDto): Promise<Employer> {
        Object.assign(employer, updateData);
        await this.employerRepository.save(employer);
        return await this.findByAttribute({ id: employer.id }) as Employer;
    }

    async suspend(employer: Employer): Promise<Employer> {
        employer.status = EmployerStatus.SUSPENDED;
        return await this.employerRepository.save(employer);
    }

    async delete(id: string): Promise<void> {
        await this.employerRepository.delete(id);
    }
}
