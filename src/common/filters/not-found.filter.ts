import { Response, Request  } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, HttpStatus} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        return res.status(HttpStatus.NOT_FOUND).json({
            message: `WELCOME TO THE EMPLOYER CONTRIBUTION SERVER - ('PATH NOT FOUND'). PLEASE REFER TO THE APIs DOCUMENTATION FOR MORE DETAILS.`,
            path: `This is the path '${req.url}' does not exist on the server.`,
            apiDocumentation: `${process.env.SERVER_URL}/api/docs`,
            status: HttpStatus.NOT_FOUND,
            success: false,
        });
    }
}