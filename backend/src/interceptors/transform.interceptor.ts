import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { JsonResponse } from 'src/jsonResponse'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, JsonResponse> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<JsonResponse> {
        return next
            .handle()
            .pipe(map(response => response))
    }
}