import { AuthGuard } from './auth.guard';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesAuthGuard extends AuthGuard {

  constructor(auth: AuthService,
    private router: Router) {
      super(auth);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
      var isAuthentificated = super.canActivate(next, state);
      const expectedRole = next.data.expectedRole;
      //return isAuthentificated ? this.auth.isInRole(expectedRole) : false;
      if(isAuthentificated){
        if(this.auth.isInRole(expectedRole)){
            return true;
        }
        return false;
      }
      this.router.navigate(['/notauthorized']);
      return false;
  }
}