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

  obtenerVehiculo(idVehiculo: number) {
    const url = encodeURI(`${this.baseUrl}/vehiculo/${idVehiculo}`);
    return this.http.get<Vehiculo>(url);
  }

  obtenerVehiculos(idVehiculos: any[]) {
    const url = encodeURI(`${this.baseUrl}/vehiculo/vehiculos/read`);
    return this.http.post<Vehiculo[]>(url, idVehiculos);
  }

  buscarVehiculos(page: number, size: number) {
    const url = encodeURI(`${this.baseUrl}/vehiculo/vehiculos?page=${page}&size=${size}`);
    return this.http.get<any>(url);
  }

  eliminarVehiculo(id: number) {
    const url = encodeURI(`${this.baseUrl}/vehiculo/delete/${id}`);
    return this.http.delete<any>(url);
  }

  vincularVehiculos(vehiculos: Vehiculo[]) {
    const url = encodeURI(`${this.baseUrl}/vehiculo/vincular`);
    return this.http.put<any>(url, vehiculos);
  }

  obtenerVehiculoPorDependencia(dependencia: string) {
    const url = encodeURI(`${this.baseUrl}/vehiculo/dependencia/${dependencia}`);
    return this.http.get<Vehiculo[]>(url);
  }

}
