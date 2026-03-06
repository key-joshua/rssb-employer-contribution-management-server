import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Endpoint(API) for checking server health status' })
  @ApiResponse({ status: 200, description: 'Server is healthy and running'})

  check() {
    return {
      success: true,
      status: HttpStatus.OK,
      uptime: process.uptime(),
      message: 'Welcome to employer contribution server. Server is running',
    };
  }
}