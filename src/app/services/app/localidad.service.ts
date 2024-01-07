import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localidad } from '../../models/localidad';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  obtenerProvincias() {
    const url = encodeURI(`${this.baseUrl}/localidad/provincias`);
    return this.http.get<Localidad[]>(url);
  }

  obtenerLocalidad(parent: number) {
    const url = encodeURI(`${this.baseUrl}/localidad/localidades/${parent}`);
    return this.http.get<Localidad[]>(url);
  }
}
