import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mantenimiento } from '../../models/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  grabarMantenimiento(mantenimiento: Mantenimiento) {
    const url = encodeURI(`${this.baseUrl}/mantenimiento/save`);
    return this.http.post<any>(url, mantenimiento);
  }
}
