import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user-services/user-service.service';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('public')) {
            return next.handle(request);
        } else if (localStorage.getItem('user')) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') || '')}`
                },
            })
            return next.handle(request);
        }
        return next.handle(request);

    }
}
