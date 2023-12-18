import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Catalogo } from '../../models/catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  baseUrl = "http://localhost:8280"

  constructor(private http: HttpClient) { }

  obtenerCatalogo(tipo: string, estado: string) {
    const url = encodeURI(`${this.baseUrl}/catalogo/lista/${tipo}/${estado}`);
    return this.http.get<Catalogo>(url);
  }

}
