import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Customer } from './../shared/models/auth/customer.interface';

import { Token } from './../shared/models/auth/token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {
    FB.init({
      appId: '140451171241667',
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v10.0',
    });
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(
        (result) => {
          if (result.authResponse) {
            this.http
              .post(`/api/auth/facebook`, {
                access_token: result.authResponse.accessToken,
              })
              .toPromise()
              .then((response: Token) => {
                if (!response.JWT_token) {
                  throw Error;
                }
                return resolve(response);
              })
              .catch(() => reject(new Error('No token found')));
          }
        },
        { scope: 'public_profile, email' }
      );
    });
  }

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>('/api/auth/login', {
      email,
      password,
    });
  }

  register(customerData: Customer): Observable<Customer> {
    return this.http.post<Customer>('/api/auth/register', {
      full_name: customerData.fullName,
      ...customerData,
    });
  }

  setToken(authResult: Token): void {
    localStorage.setItem('JWT_token', authResult.JWT_token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('JWT_token');

    return !this.jwtHelper.isTokenExpired(token);
  }
}
