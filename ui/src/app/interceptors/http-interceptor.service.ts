import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from './../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // TODO: token expiration check

    // add a custom header
    const token: string = this.tokenService.getToken();

    let customReq;
    if (token === null) {
      customReq = request.clone();
    } else {
      customReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken())
      });
    }
    // pass on the modified request object
    return next.handle(customReq);
  }

}
