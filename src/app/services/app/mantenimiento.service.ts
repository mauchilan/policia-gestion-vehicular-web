import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mantenimiento } from '../../models/mantenimiento';
import { MantenimientoDto } from '../../models/mantenimiento.dto';
import { MantenimientoRequest } from '../../models/mantenimiento.request';

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

  obtenerMantenimientoEstado(estado: string) {
    const url = encodeURI(`${this.baseUrl}/mantenimiento/solicitudes/${estado}`);
    return this.http.get<MantenimientoDto[]>(url);
  }

  updateMantenimiento(request: MantenimientoRequest) {
    const url = encodeURI(`${this.baseUrl}/mantenimiento/update-mantenimiento`);
    return this.http.put<any>(url, request);
  }
  
}
