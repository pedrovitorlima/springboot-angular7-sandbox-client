import { AuthService } from './shared/auths/auth.service';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if(err.status == 401) {
                this.authenticationService.logout();
                location.reload(true);
            }else if (err.status == 403) {
                this.authenticationService.logout();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            console.log("error => " + error);
            return throwError(error);
        }))
    }
}