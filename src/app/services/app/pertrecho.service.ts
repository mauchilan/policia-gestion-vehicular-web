import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pertrecho } from '../../models/pertrecho';

@Injectable({
  providedIn: 'root'
})
export class PertrechoService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  grabarPertrecho(pertrecho: Pertrecho) {
    const url = encodeURI(`${this.baseUrl}/pertrecho/crear`);
    return this.http.post<any>(url, pertrecho);
  }

  buscarVehiculos(page: number, size: number) {
    const url = encodeURI(`${this.baseUrl}/pertrecho/pertrechos?page=${page}&size=${size}`);
    return this.http.get<any>(url);
  }

}
