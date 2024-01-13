import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehiculoPersonal } from '../../models/vehiculo.personal';

@Injectable({
  providedIn: 'root'
})
export class VehiculoPersonalService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  grabarVehiculoPersonal(vehiculoPersonal: VehiculoPersonal) {
    const url = encodeURI(`${this.baseUrl}/vehiculo-personal/crear`);
    return this.http.post<any[]>(url, vehiculoPersonal);
  }

  obtenerVinculacionPorPersonal(id: string) {
    const url = encodeURI(`${this.baseUrl}/vehiculo-personal/personal/${id}`);
    return this.http.get<VehiculoPersonal[]>(url);
  }
  
}
