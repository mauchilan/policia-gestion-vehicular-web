import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Vehiculo } from '../../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  crearVehiculo(vehiculo: Vehiculo) {
    const url = encodeURI(`${this.baseUrl}/vehiculo/crear`);
    return this.http.post<any>(url, vehiculo);
  }

  buscarVehiculos(page: number, size: number) {
    const url = encodeURI(`${this.baseUrl}/vehiculo/vehiculos?page=${page}&size=${size}`);
    return this.http.get<any>(url);
  }

  eliminarVehiculo(id: number) {
    const url = encodeURI(`${this.baseUrl}/vehiculo/delete/${id}`);
    return this.http.delete<any>(url);
  }

}
