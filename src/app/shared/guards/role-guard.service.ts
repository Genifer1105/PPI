import { AuthService } from './../services/auth.service';
import { Constants } from 'src/app/shared/constants';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('RoleGuard', {expectedRoles: route.data.expectedRoles});
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    if (route.data && route.data.expectedRoles) {
      const token = localStorage.getItem(Constants.LOGIN_TOKEN);
      const tokenPayload = decode(token);
      console.log({profile: tokenPayload.identity.profile});
      console.log({expectedRoles: route.data.expectedRoles});
      if (!route.data.expectedRoles.find(x => x.id === tokenPayload.identity.profile)) {
        this.router.navigate(['home']);
        return false;
      }
    }
    return true;
  }

}
