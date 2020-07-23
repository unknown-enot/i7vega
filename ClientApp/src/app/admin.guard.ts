import { AuthGuard } from './auth.guard';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AdminGuard extends AuthGuard {

  constructor(auth: AuthService,
    private router: Router) {
      super(auth);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    
    var isAuthenticated = super.canActivate(next, state);
    
    if(isAuthenticated && this.auth.isInRole('Admin'))
        return true;
    else if (!this.auth.isInRole('Admin')) {
        alert('Error! Not authorized!');
        return false;
    }
    return false;
  }

}