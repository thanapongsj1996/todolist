import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JsonResponse } from 'src/jsonResponse'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, JsonResponse> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<JsonResponse> {
        return next
            .handle()
    }
}