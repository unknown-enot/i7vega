import { AuthGuard } from './auth.guard';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesAuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router) {
      
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
      //var isAuthentificated = super.canActivate(next, state);
      const expectedRole = next.data.expectedRole;
      //return isAuthentificated ? this.auth.isInRole(expectedRole) : false;
      // if(isAuthentificated){
      //   if(this.auth.isInRole(expectedRole)){
      //       return true;
      //   }
      //   this.router.navigate(['/vehicles']);
      //   return false;
      // }
      // this.router.navigate(['/notauthorized']);
      // return false;
      return this.auth.userProfile$.pipe(
        switchMap(userProfile => userProfile['https://dev-eu-vega.com/roles']),
        map((isInRole : string[]) => isInRole.indexOf(expectedRole) > -1)
      );
  }
}