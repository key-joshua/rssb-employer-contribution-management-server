import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';

import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { Employer } from '../employer/employer.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateEmployeeDto } from 'src/common/dto/employee.dto';
import { PaginationMeta } from 'src/common/utils/pagination.util';
import { CheckEmployeeFieldPipe } from 'src/common/pipes/check-employee.pipe';

@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    @ApiOperation({ summary: 'Endpoint(API) for retrieving all employees' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Employees retrieved successfully.' })
    async getEmployees(@Query() pagination: PaginationDto): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: { employees: Employee[]; meta: PaginationMeta } }> {
        const employer =  { id: 'd99f3060-90ee-4b46-afe7-dfea56e0d04a' } as any;
        const { employees, meta } = await this.employeeService.findAll(employer, pagination);

        return {
        message: employees.length ? 'Employees retrieved successfully.' : 'Employees not found.',
        statusCode: HttpStatus.OK,
        success: true,
        data: { employees, meta }
        };
    }

    @Post()
    @ApiOperation({ summary: 'Endpoint(API) for creating employee' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Employee created successfully.' })
    async createEmployee(@Body(CheckEmployeeFieldPipe(['nationalId'])) body: CreateEmployeeDto): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: Employee }> {
        const employerId = 'd99f3060-90ee-4b46-afe7-dfea56e0d04a' as string;
        const employee = await this.employeeService.create({ ...body, employer: { id: employerId } as Employer, dateOfBirth: new Date(body.dateOfBirth), hireDate: new Date(body.hireDate) });

        return {
            message: 'Employee created successfully.',
            statusCode: HttpStatus.CREATED,
            success: true,
            data: employee
        };
    }
}
