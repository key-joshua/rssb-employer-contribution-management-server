import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuardMixin } from 'src/common/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

import { Employer } from '../employer/employer.entity';
import { Employee } from '../employee/employee.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationMeta } from 'src/common/utils/pagination.util';
import { Declaration, DeclarationStatus } from './declaration.entity';
import { CheckUUIDPipe } from 'src/common/pipes/check-param-pipe';
import { DeclarationService } from 'src/modules/declaration/declaration.service';
import { CalculatedContributionLine } from 'src/common/utils/calculated-contribution-line';
import { CreateDeclarationDto, ValidateDeclarationDto } from 'src/common/dto/declaration.dto';
import { CheckDeclarationFieldPipe, CheckDeclarationParamPipe, CheckDeclarationDraftPipe, CheckDeclarationSubmittedPipe } from 'src/common/pipes/check-declaration.pipe';

@ApiTags('Declarations')
@Controller('declarations')
export class DeclarationController {
    constructor(private readonly declarationService: DeclarationService) {}

    @Get()
    @ApiOperation({ summary: 'Endpoint(API) for retrieving all declarations' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Declarations retrieved successfully.' })
    async getDeclarations(@Query() pagination: PaginationDto): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: { declarations: Declaration[]; meta: PaginationMeta } }> {
        const { declarations, meta } = await this.declarationService.findAll(pagination);

        return {
        message: declarations.length ? 'Declarations retrieved successfully.' : 'Declarations not found.',
        statusCode: HttpStatus.OK,
        success: true,
        data: { declarations, meta }
        };
    }
    
    @Get('/employer')
    @UseGuards(JwtAuthGuardMixin(['employer']))
    @ApiOperation({ summary: 'Endpoint(API) for retrieving all employer declarations' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Employer declarations retrieved successfully.' })
    async getEmployerDeclarations(@Req() req, @Query() pagination: PaginationDto): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: { declarations: Declaration[]; meta: PaginationMeta } }> {
        const employer = { id: req.user.id } as any;
        const { declarations, meta } = await this.declarationService.findEmployerDeclarations(employer, pagination);
        
        return {
            message: declarations.length ? 'Employer declarations retrieved successfully.' : 'Employer declarations not found.',
            statusCode: HttpStatus.OK,
            success: true,
            data: { declarations, meta }
        };
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Endpoint(API) for retrieving declaration' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Declaration retrieved successfully.' })
    async getDeclaration(@Param('id', CheckUUIDPipe, CheckDeclarationParamPipe('id')) declaration: Declaration): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: Declaration }> {
        return {
            message: declaration ? 'Declaration retrieved successfully.' : 'Declaration not found.',
            statusCode: HttpStatus.OK,
            success: true,
            data: declaration
        };
    }
    
    @Post()
    @UseGuards(JwtAuthGuardMixin(['employer']))
    @ApiOperation({ summary: 'Endpoint(API) for creating declaration' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Declaration created successfully.' })
    async createDeclaration(@Req() req, @Body(CheckDeclarationFieldPipe(['period', 'paymentNumber'])) body: CreateDeclarationDto): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: Declaration }> {
        const employerId = req.user.id as string;
        const declaration = await this.declarationService.create({ ...body, employer: { id: employerId } as Employer });

        const employerEmployees = await this.declarationService.findEmployerEmployees({ id: employerId } as Employer);
        if (!employerEmployees.length) {
            return {
                message: 'Declaration created successfully. But employer has no employees to generate contribution lines.',
                statusCode: HttpStatus.CREATED,
                success: true,
                data: declaration
            };
        }

        const contributionLines = employerEmployees.map(employee => {
            const grossSalary = Number(employee.grossSalary);
            const { pensionAmount, medicalAmount, maternityAmount, total } = CalculatedContributionLine(grossSalary);
            return this.declarationService.createContributionLines({ employee: { id: employee.id } as Employee, declaration: { id: declaration.id } as Declaration, grossSalary, pensionAmount, medicalAmount, maternityAmount, total });

        });

        return {
            message: 'Declaration created successfully, along with contribution lines.',
            statusCode: HttpStatus.CREATED,
            success: true,
            data: { ...declaration, contributionLines: await Promise.all(contributionLines) }
        };
    }

    @Patch('/submit/:id')
    @UseGuards(JwtAuthGuardMixin(['employer']))
    @ApiOperation({ summary: 'Endpoint(API) for submitting declaration' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Declaration submitted successfully.' })
    async submitDeclaration(@Param('id', CheckUUIDPipe, CheckDeclarationParamPipe('id'), CheckDeclarationDraftPipe) declaration: Declaration): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: Declaration }> {
        const updatedDeclaration = await this.declarationService.update(declaration.id, DeclarationStatus.SUBMITTED);

        return {
            message: 'Declaration submitted successfully.',
            statusCode: HttpStatus.OK,
            success: true,
            data: updatedDeclaration
        };
    }

    @Patch('/status/:id')
    @UseGuards(JwtAuthGuardMixin(['admin']))
    @ApiOperation({ summary: 'Endpoint(API) for validating declaration status' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Declaration status validated successfully.' })
    async validateDeclaration(@Param('id', CheckUUIDPipe, CheckDeclarationParamPipe('id'), CheckDeclarationSubmittedPipe) declaration: Declaration, @Body() body: ValidateDeclarationDto): Promise<{ message: string; statusCode: HttpStatus; success: boolean; data: Declaration }> {
        const updatedDeclaration = await this.declarationService.update(declaration.id, body.status as DeclarationStatus);

        return {
            message: `Declaration status ${body.status} successfully.`,
            statusCode: HttpStatus.OK,
            success: true,
            data: updatedDeclaration
        };
    }
}
