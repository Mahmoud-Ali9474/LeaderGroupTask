import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedIn = this.authenticationService.loggedIn();
    if (loggedIn) {
      // check if route is restricted by role

      var roles: string[] = [];
      roles = this.authenticationService.getRoles();

      var requiredRoles = route.data['roles'] || [];
      console.log(this.authenticationService.getUserInfo(), requiredRoles);
      if (!requiredRoles.length) return true;
      if (
        !requiredRoles.some((r: any) => roles.some((cr: any) => cr.trim() == r))
      ) {
        // role not authorised so redirect to home page
        this.router.navigate(['/home']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
