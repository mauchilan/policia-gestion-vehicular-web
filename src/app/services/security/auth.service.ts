import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService) { }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogin');
    this.keycloakService.logout();
  }

  setToken(token: any): any {
    return localStorage.setItem('token', token);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    const token = localStorage.getItem('token');
    return  token != null && token.length > 0;
  }

  getUserStorage() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('userLogin'));
  }

  setUserStorage(user: any) {
    localStorage.setItem('userLogin', JSON.stringify(user));
  }

}
