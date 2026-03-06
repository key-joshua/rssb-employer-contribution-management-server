import { Request, Response } from 'express';
import { ThrottlerException } from '@nestjs/throttler';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, } from '@nestjs/common';

@Catch(ThrottlerException)
export class RateLimitFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      message: `Too many requests. Only ${process.env.RATE_LIMIT_MAX || 5} requests allowed per ${Number(process.env.RATE_LIMIT_TTL)/1000 || 60000/1000} seconds.`,
      path: `This is the path '${req.url}' requested.`,
      status: HttpStatus.TOO_MANY_REQUESTS,
      success: false,
    });
  }
}
