import { Constants } from './../constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private static readonly AUTH_ROUTE = Constants.URL_SERVER + 'auth/';

  private static readonly AUTH_ROUTES = {
    createUser: UsersService.AUTH_ROUTE + 'create_user',
    updateUser: UsersService.AUTH_ROUTE + 'update_user',
    getUser: UsersService.AUTH_ROUTE + 'get_user',
    getUsers: UsersService.AUTH_ROUTE + 'get_users'
  };


  constructor(private http: HttpClient) {}

  public async getUsers(): Promise<User[]> {
    return await this.http.get<User[]>(UsersService.AUTH_ROUTES.getUsers).toPromise();
  }

  public async getUser(identificacion): Promise<User> {
    return await this.http.get<User>(UsersService.AUTH_ROUTES.getUser + '/' + identificacion).toPromise();
  }

  public async createUser(user: User): Promise<any> {
    return await this.http.post(UsersService.AUTH_ROUTES.createUser, user).toPromise();
  }

  public async updateUser(user: User): Promise<any> {
    return await this.http.put(UsersService.AUTH_ROUTES.updateUser + '/' + user.identificacion, user).toPromise();
  }

}
