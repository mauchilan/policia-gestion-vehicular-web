import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localidad } from '../../models/localidad';
import { Dependencia } from '../../models/dependencia';
import { Catalogo } from '../../models/catalogo';
import { Sugerencia } from '../../models/sugerencia';

@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  grabar(sugerencia: Sugerencia) {
    const url = encodeURI(`${this.baseUrl}/sugerencia/save`);
    return this.http.post<any>(url, sugerencia);
  }

  obtenerProvincias() {
    const url = encodeURI(`${this.baseUrl}/sugerencia/provincias`);
    return this.http.get<Localidad[]>(url);
  }

  obtenerDependenciaLocalidad(localidad: Localidad) {
    const url = encodeURI(`${this.baseUrl}/sugerencia/localidad`);
    return this.http.post<Dependencia[]>(url, localidad);
  }

  obtenerDependenciaParent(parent: string) {
    const url = encodeURI(`${this.baseUrl}/sugerencia/parent/${parent}`);
    return this.http.get<Dependencia[]>(url);
  }

  obtenerCatalogo(tipo: string, estado: string) {
    const url = encodeURI(`${this.baseUrl}/sugerencia/lista/${tipo}/${estado}`);
    return this.http.get<Catalogo>(url);
  }

}
