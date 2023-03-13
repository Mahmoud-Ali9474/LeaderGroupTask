import { Role } from './../_models/role';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  jwthelper = new JwtHelperService();
  constructor(private httpClient: HttpClient, private router: Router) {}
  public login(model: any) {
    return this.httpClient
      .post(environment.baseUrl + 'api/auth/login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
          }
        })
      );
  }
  public loggedIn() {
    return !this.jwthelper.isTokenExpired(localStorage.getItem('token'));
  }
  public getUserInfo() {
    if (this.loggedIn()) {
      return this.jwthelper.decodeToken(localStorage.getItem('token')!);
    }
  }
  getUserToken() {
    return localStorage.getItem('token');
  }
  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
  getRoles() {
    var loggedIn = this.loggedIn();
    if (loggedIn) {
      var role = this.getUserInfo().role;
      if (typeof role == 'string') return [role];
      else return role;
    } else {
      this.router.navigate(['/home']);
      return [];
    }
  }
  isAdmin() {
    var loggedIn = this.loggedIn();
    if (loggedIn) {
      return this.getRoles().some((r: any) => r == Role.Admin);
    }
  }
  isManager() {
    var loggedIn = this.loggedIn();
    if (loggedIn) {
      return this.getRoles().some((r: any) => r == Role.Manager);
    }
  }
  isCustomer() {
    var loggedIn = this.loggedIn();
    if (loggedIn) {
      return this.getRoles().some((r: any) => r == Role.Customer);
    }
  }
}
