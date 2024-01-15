import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReporteSugerencia } from '../../models/reporte.sugerencia';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  baseUrl = "http://localhost:8280/gestion-api";

  constructor(private http: HttpClient) { }

  obtenerReporteSugerencia(fechaInicio: Date, fechaFin: Date) {
    const url = encodeURI(`${this.baseUrl}/reporte/sugerencia/${fechaInicio}/${fechaFin}`);
    return this.http.get<ReporteSugerencia[]>(url);
  }
}
