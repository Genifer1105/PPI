import { AuthService } from './../services/auth.service';
import { Constants } from 'src/app/shared/constants';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import decode from 'jwt-decode';
@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['dashboard', 'home']);
      return false;
    }
    return true;
  }

}
