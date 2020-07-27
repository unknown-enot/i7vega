import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(protected auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    // return this.auth.isAuthenticated$.pipe(
    //   tap(loggedIn => {
    //     if (!loggedIn) {
    //       this.auth.login(state.url);
    //     }
    //   })
    // );
    return this.auth.userProfile$.pipe(
      map(user => {
        if(user)
          return true;
      this.auth.login(state.url);
      return false;
    })
    );
  }

}