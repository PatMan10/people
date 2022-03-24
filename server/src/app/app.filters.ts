import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorResponse } from '../common/models/http.model';
import { Messages } from '../common/utils/const';
import logger from '../common/utils/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    let error: ErrorResponse;

    // handle HttpException
    if (exception instanceof HttpException) {
      const ex = exception as HttpException;
      const exRes = ex.getResponse();

      if (!(exRes instanceof ErrorResponse))
        error = new ErrorResponse(exRes['statusCode'], exRes['message']);
      else error = exRes;

      logger.debug('http exception => ', error);
    }

    // handle other Exceptions
    else {
      error = new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        Messages.fail.INTERNAL_SERVER_ERROR,
      );
      logger.error('unexpected exception => ', exception);
    }

    res.status(error.status).send(error);
  }
}
