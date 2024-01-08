import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  obtenerPersonal() {
    const url = encodeURI(`${this.baseUrl}/user/users`);
    return this.http.get<any[]>(url);
  }

  updateDependencia(user: any) {
    const url = encodeURI(`${this.baseUrl}/user/dependencia`);
    return this.http.put<any>(url, user);
  }

  obtenerPersonalPorDependencia(atributo: string, dependencia: string) {
    const url = encodeURI(`${this.baseUrl}/user/users/${atributo}/${dependencia}`);
    return this.http.get<User[]>(url);
  }

}
