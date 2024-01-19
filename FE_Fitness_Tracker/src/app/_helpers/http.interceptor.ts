import { Injectable } from '@angular/core';
import {
    HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor as AngularHttpInterceptor
} from '@angular/common/http';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from "../_services/auth.service";
import { Router } from "@angular/router";
import { Observable, throwError } from 'rxjs';
import { MessageService } from '../_services/message.service';

@Injectable()
export class HttpInterceptor implements AngularHttpInterceptor {

    constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.authService.AuthenticatedUser$.pipe(
            take(1),
            switchMap(user => {
                if (!user) {
                    return next.handle(request);
                }
                return next.handle(request).pipe(
                    catchError(err => {
                        if (err instanceof HttpErrorResponse) {
                            switch (err.status) {
                                case 403:
                                    this.router.navigate(['forbidden']);
                                    break;
                                case 401:
                                    return this.authService.refreshToken().pipe(
                                        switchMap(() => next.handle(request)),
                                        catchError(err => {
                                            if (err.status === 403) {
                                                this.authService.logout();
                                            }
                                            return throwError(() => err);
                                        })
                                    );
                                case 409:
                                    this.messageService.changeMessage('Username or email already in use.');
                                    break;
                                default:
                                    // Handle other errors
                                    break;
                            }
                        }
                        return throwError(() => err);
                    })
                );
            })
        );
    }
}
