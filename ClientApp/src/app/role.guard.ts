import { Injectable, OnDestroy } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class RoleGuard implements CanActivate, OnDestroy {
  subscription: Subscription;
  constructor(
    public auth: AuthService, 
    public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): 
    Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    
      if(!this.auth.loggedIn) {
        return false;
      }
      //... your role guard check code goes here
      const expectedRole = route.data.expectedRole;
      
      var profile;
      this.subscription = this.auth.userProfile$.pipe(take(1)).subscribe(res => profile = res);
      if (profile)
      {
        if(profile['https://dev-eu-vega.com/roles'].indexOf(expectedRole) > -1){
          console.log('Success', profile);
          return true;
        }
          
      }  
      this.router.navigate(['/notauthorized']);
      return false;
    };

    ngOnDestroy(){
      //this.subscription.unsubscribe();
    }
  
  
 
}

// import { Injectable } from '@angular/core';

// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// import { Observable } from 'rxjs';

// import { AuthService } from './auth.service';

// import { tap, filter, concatMap, map, mergeMap } from 'rxjs/operators';

// @Injectable()

// export class AdminGuard implements CanActivate {

//   constructor(

//     private auth: AuthService,

//     private router: Router

//   ) { }

//   canActivate(

//     next: ActivatedRouteSnapshot,

//     state: RouterStateSnapshot

//   ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {

//     return this.auth.userProfile$.pipe(

//       filter((value) => !!value),

//       tap(userProfile => {

//         const groups = userProfile['https://xxxxxxx/claims/groups'];

//         const isAdmin = groups.indexOf('Admin') > -1;

//         if (isAdmin) {

//           console.log('is admin');

//           return true;

//         } else {

//           this.router.navigate(['/error/access']);

//           return false;

//         }

//       })

//     );

//   }

// }
