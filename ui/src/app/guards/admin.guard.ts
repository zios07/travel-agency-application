import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {from, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> | boolean | UrlTree {


    return from(this.authService.getConnectedUser()).pipe(
      map(user => {
        if (user.role === 'ADMIN') {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
        }
      }),
      catchError((err) => {
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );

  }

}
