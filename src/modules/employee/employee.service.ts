import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Employee } from './employee.entity';
import { Employer } from '../employer/employer.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { formatPaginationMetaUtil } from 'src/common/utils/pagination.util';

@Injectable()
export class EmployeeService {
    constructor( @InjectRepository(Employee) private employeeRepository: Repository<Employee> ) {}

    async findAll(employer: Employer, pagination: PaginationDto) {
        const { page = Number(process.env.PAGE_NUMBER) || 1, limit = Number(process.env.PAGE_SIZE) || 10 } = pagination;
        const [rows, totalCount] = await this.employeeRepository.findAndCount({ where: { employer }, relations: ['employer'], skip: (page - 1) * limit, take: limit });

        const meta = formatPaginationMetaUtil(page, limit, totalCount);
        return { employees: rows, meta };
    }
    
    async findByAttribute(attribute: Record<string, any>): Promise<Employee | null> {
        return await this.employeeRepository.findOne({ where: attribute });
    }

    async create(data: Partial<Employee>) {
        const employee = this.employeeRepository.create(data);
        return await this.employeeRepository.save(employee);
    }
}
