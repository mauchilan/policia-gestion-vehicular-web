import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.excludeUrlTokens(req)) {
      const token = this.authService.getToken();
      if (token) {
        // this does not overwirte headers already there like it seems
        // isntead it merges new header with ones already there
        let contentType = req.headers.get('Content-Type');
        if (!contentType) {
          contentType = 'application/json';
        }
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token,
            'Content-Type': contentType
          }
        });
      }
    }
    return next.handle(req).pipe(
      tap(
        (error: any) => {
          const url = req.url;
          if (url.indexOf('/login') < 0) { // Si es login no tiene que hacer caso a errores 401.
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                this.authService.logout();
              } else if (error.status === 403) {
                this.authService.logout();
              } else if (error.status === 408) {
                this.authService.logout();
              }
            }
          }
        })
    );
  }

  private excludeUrlTokens(req: HttpRequest<any>): boolean {
    let exclude = false;
    if (req.url.includes('this.environmentConfig.environment.nodeBackendUrl')) {
      exclude = true;
    }
    return exclude;
  }
}