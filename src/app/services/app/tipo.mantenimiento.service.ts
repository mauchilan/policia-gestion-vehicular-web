import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoMantenimiento } from '../../models/tipo.mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class TipoMantenimientoService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  obtenerTipoMantenimiento() {
    const url = encodeURI(`${this.baseUrl}/tipo-mantenimiento/all`);
    return this.http.get<TipoMantenimiento[]>(url);
  }

}
