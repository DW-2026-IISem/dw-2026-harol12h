var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, RequestTimeoutException, } from '@nestjs/common';
import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
let TimeoutInterceptor = class TimeoutInterceptor {
    intercept(context, next) {
        return next.handle().pipe(timeout(30000), catchError((err) => {
            if (err instanceof TimeoutError) {
                return throwError(() => new RequestTimeoutException());
            }
            return throwError(() => err);
        }));
    }
};
TimeoutInterceptor = __decorate([
    Injectable()
], TimeoutInterceptor);
export { TimeoutInterceptor };
//# sourceMappingURL=timeout.interceptor.js.map