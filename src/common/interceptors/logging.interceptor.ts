import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req?.method;
    const url = req?.originalUrl || req?.url;
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - now;
        // Use console to avoid depending on Nest Logger here
        console.log(`[${method}] ${url} - ${ms}ms`);
      }),
    );
  }
}
