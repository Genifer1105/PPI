import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly urlAuth: string = 'http://localhost:5000/auth';
  private readonly urlAuthGetUsers: string =
    'http://localhost:5000/auth/get_users';
  private readonly urlAuthCreateUsers: string =
    'http://localhost:5000/auth/create_user';

  constructor(private http: HttpClient) {}

  public async getUsers(): Promise<User[]> {
    return await this.http.get<User[]>(this.urlAuthGetUsers).toPromise();
  }

  public async createUser(user: User): Promise<any> {
    return await this.http.post(this.urlAuthCreateUsers, user).toPromise();
  }

}
