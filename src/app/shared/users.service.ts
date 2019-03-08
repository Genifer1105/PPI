import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly urlAuth: String = 'http://0.0.0.0:5000/auth'; 
  private readonly urlAuthGetUsers: String = 'http://0.0.0.0:5000/auth/get_users'; 
  private readonly urlAuthGetUsers: String = 'http://0.0.0.0:5000/auth/create_user'; 

  constructor(
    private http: HttpClient
  )
   { 
     
  }

  public getUsers() {
    this.http.get
  }

}
