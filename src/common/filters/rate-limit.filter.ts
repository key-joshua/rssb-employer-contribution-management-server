import { Request, Response } from 'express';
import { ThrottlerException } from '@nestjs/throttler';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, } from '@nestjs/common';

@Catch(ThrottlerException)
export class RateLimitFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.TOO_MANY_REQUESTS).json({
      message: 'Too many requests. Only 5 requests allowed per 60 seconds.',
      path: `This is the path '${request.url}' requested.`,
      status: HttpStatus.TOO_MANY_REQUESTS,
      success: false,
    });
  }
}
