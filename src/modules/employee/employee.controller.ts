import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';

import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
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
        const employer =  { id: '5adc3068-0697-42c8-9232-b31ca1d6a0c1' } as any;
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
        (body as any).employer = { id: '5adc3068-0697-42c8-9232-b31ca1d6a0c1' }
        const employee = await this.employeeService.create({ ...body, dateOfBirth: new Date(body.dateOfBirth), hireDate: new Date(body.hireDate) });

        return {
            message: 'Employee created successfully.',
            statusCode: HttpStatus.CREATED,
            success: true,
            data: employee
        };
    }
}
