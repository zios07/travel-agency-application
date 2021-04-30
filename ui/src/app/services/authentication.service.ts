import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {JwtAuthenticationRequest} from '../models/JwtAuthenticationRequest';
import {User} from '../models/User';
import {TokenService} from './token.service';

const BASE_URL = environment.API_URL;
const API_LOGIN_URL = BASE_URL + '/v1/authentication/authenticate';
const API_REGISTRATION_URL = BASE_URL + '/users/register';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtHelper = new JwtHelperService();
  connectedUser: User;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  login(jwtAuthenticationRequest: JwtAuthenticationRequest) {
    return this.http.post(API_LOGIN_URL, jwtAuthenticationRequest, {responseType: 'text'});
  }

  register(user: User) {
    return this.http.post(API_REGISTRATION_URL, user);
  }

  async getConnectedUser() {
    if (this.connectedUser) {
      return this.connectedUser;
    } else {
      const stringUser = await localStorage.getItem('connectedUser');
      ;
      if (stringUser) {
        return JSON.parse(stringUser);
      }
    }
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    const decodedToken: any = this.jwtHelper.decodeToken(token);
    if (decodedToken && decodedToken.role && decodedToken.role.indexOf('ADMIN') > -1) {
      return true;
    }
    return false;
  }

  isAuthenticated() {
    const token = this.tokenService.getToken();
    if (!token) {
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  logout() {
    this.tokenService.deleteToken();
    localStorage.removeItem('connectedUser');
  }

  setConnectedUser(user) {
    this.connectedUser = user;
    localStorage.setItem('connectedUser', JSON.stringify(user));
  }
}
