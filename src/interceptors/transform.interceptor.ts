import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response as ExpressResponse } from 'express';

export interface Response<T> {
  success: true;
  code: 'OK';
  data: T;
  message: string;
  transactionId: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<ExpressResponse>();
    const transactionId = response.locals.transactionId;

    return next.handle().pipe(
      map((data) => ({
        success: true,
        code: 'OK',
        data,
        message: '',
        transactionId,
      })),
    );
  }
}
