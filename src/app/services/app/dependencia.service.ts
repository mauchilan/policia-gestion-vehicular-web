import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dependencia } from '../../models/dependencia';
import { Localidad } from '../../models/localidad';

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  obtenerDependencias(tipo: string) {
    const url = encodeURI(`${this.baseUrl}/dependencia/dependencias/${tipo}`);
    return this.http.get<Dependencia[]>(url);
  }

  grabarDependencia(dependencia: Dependencia) {
    const url = encodeURI(`${this.baseUrl}/dependencia/save`);
    return this.http.post<any[]>(url, dependencia);
  }

  obtenerDependenciaLocalidad(localidad: Localidad) {
    const url = encodeURI(`${this.baseUrl}/dependencia/localidad`);
    return this.http.post<Dependencia[]>(url, localidad);
  }

  obtenerDependenciaParent(parent: string) {
    const url = encodeURI(`${this.baseUrl}/dependencia/parent/${parent}`);
    return this.http.get<Dependencia[]>(url);
  }

}
