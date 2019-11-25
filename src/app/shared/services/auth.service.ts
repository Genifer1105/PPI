import { Constants } from './../constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly AUTH_ROUTE = Constants.URL_SERVER + 'auth/';

  public static readonly AUTH_ROUTES = {
    login: AuthService.AUTH_ROUTE + 'login',
    sendRecoveryMail: AuthService.AUTH_ROUTE + 'send_recovery_mail',
    getLoggedUser: AuthService.AUTH_ROUTE + 'get_logged_user',
    changePassword: AuthService.AUTH_ROUTE + 'change_password'
  };

  private jwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) {

  }

  public isAuthenticated() {
    const token = localStorage.getItem(Constants.LOGIN_TOKEN);
    console.log('isAuthenticated', {token})
    return token && !this.jwtHelperService.isTokenExpired(token);
  }

  public async logout() {
    localStorage.removeItem(Constants.LOGIN_TOKEN);
  }

  public async login(correo: string, contrasena: string) {
    try {
      const data = { correo, contrasena };
      const result: any = await this.http.post(AuthService.AUTH_ROUTES.login, data).toPromise();
      localStorage.setItem(Constants.LOGIN_TOKEN, result.token);
      return result.data;
    } catch (error) {
      console.error('error on login', { error });
      throw error;
    }
  }

  public async sendRecoveryMail(email: string) {
    try {
      const data = { email };
      const result: any = await this.http.post(AuthService.AUTH_ROUTES.sendRecoveryMail, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on sendRecoveryMail', { error });
    }
  }

  public async getLoggedUser() {
    try {
      const result = await this.http.get(AuthService.AUTH_ROUTES.getLoggedUser).toPromise();
      return result;
    } catch (error) {
      console.error('error on getLoggedUser', { error });
      throw error;
    }
  }

  public async changePassword(password: string, new_password: string) {
    try {
      const data = { password, new_password };
      const result = await this.http.post(AuthService.AUTH_ROUTES.changePassword, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on getLoggedUser', { error });
      throw error;
    }
  }

}

