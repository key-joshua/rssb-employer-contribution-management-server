import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Query, Body, Post, Param, Patch, Delete } from '@nestjs/common';

import { Employer } from './employer.entity';
import { EmployerService } from './employer.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationMeta } from 'src/common/utils/pagination.util';
import { CreateEmployerDto, UpdateEmployerDto } from 'src/common/dto/employer.dto';
import { CheckEmployerFieldPipe, CheckEmployerParamPipe, CheckUUIDPipe } from 'src/common/pipes/check-employer.pipe';


@ApiTags('Employers')
@Controller('employers')
export class EmployerController {
    constructor(private readonly employerService: EmployerService) {}

    @Get()
    @ApiOperation({ summary: 'Endpoint(API) for retrieving all employers' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Employers retrieved successfully.' })
    async getEmployers(@Query() pagination: PaginationDto): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: { employers: Employer[]; meta: PaginationMeta } }> {
        const { employers, meta } = await this.employerService.findAll(pagination);

        return {
        message: employers.length ? 'Employers retrieved successfully.' : 'Employers not found.',
        statusCode: HttpStatus.OK,
        success: true,
        data: { employers, meta }
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Endpoint(API) for retrieving employer by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Employer retrieved successfully.' })
    async getEmployerById(@Param('id', CheckUUIDPipe, CheckEmployerParamPipe('id')) employer: Employer): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: Employer }> {
        
        return {
            message: 'Employer retrieved successfully.',
            statusCode: HttpStatus.OK,
            success: true,
            data: employer
        };
    }

    @Post()
    @ApiOperation({ summary: 'Endpoint(API) for creating employer' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Employer created successfully.' })
    async createEmployer(@Body(CheckEmployerFieldPipe(['name', 'tin'])) body: CreateEmployerDto): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: Employer }> {
        const employer = await this.employerService.create(body);

        return {
            message: 'Employer created successfully.',
            statusCode: HttpStatus.CREATED,
            success: true,
            data: employer
        };

    }

    @Patch(':id')
    @ApiOperation({ summary: 'Endpoint(API) for updating employer by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Employer updated successfully.' })
    async updateEmployer( @Param('id', CheckUUIDPipe, CheckEmployerParamPipe('id')) employer: Employer, @Body(CheckEmployerFieldPipe(['name', 'tin'])) updateData: UpdateEmployerDto ): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: Employer }> {
        const updatedEmployer = await this.employerService.update(employer, updateData);

        return {
            message: 'Employer updated successfully.',
            statusCode: HttpStatus.OK,
            success: true,
            data: updatedEmployer
        };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Endpoint(API) for deleting an employer by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Employer deleted successfully.' })
    async deleteEmployer(@Param('id', CheckUUIDPipe, CheckEmployerParamPipe('id')) employer: Employer): Promise<{ message: string; statusCode: HttpStatus; success: boolean }> {
        await this.employerService.delete(employer.id);

        return {
            message: 'Employer deleted successfully.',
            statusCode: HttpStatus.OK,
            success: true,
        };
    }

    @Patch('/suspend/:id')
    @ApiOperation({ summary: 'Endpoint(API) for suspending an employer by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Employer suspended successfully.' })
    async suspendEmployer(@Param('id', CheckUUIDPipe, CheckEmployerParamPipe('id')) employer: Employer): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: Employer }> {
        const suspendedEmployer = await this.employerService.suspend(employer);

        return {
            message: 'Employer suspended successfully.',
            statusCode: HttpStatus.OK,
            success: true,
            data: suspendedEmployer
        };
    }

}
