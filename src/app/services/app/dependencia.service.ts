import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dependencia } from '../../models/dependencia';

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
}
