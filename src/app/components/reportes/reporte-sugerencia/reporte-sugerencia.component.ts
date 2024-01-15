import { Component, OnInit } from '@angular/core';
import { ReporteSugerencia } from '../../../models/reporte.sugerencia';
import { ReporteService } from '../../../services/app/reporte.service';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reporte-sugerencia',
  templateUrl: './reporte-sugerencia.component.html'
})
export class ReporteSugerenciaComponent implements OnInit {

  reporte!: UntypedFormGroup;
  listaReporteSugerencia: ReporteSugerencia[] = [];
  visible: boolean = false;

  constructor(public formBuilder: UntypedFormBuilder, private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.reporte = this.formBuilder.group({
      fechaInicio: new FormControl("", [Validators.required]),
      fechaFin: new FormControl("", [Validators.required]),
    });
  }

  obtenerReporteSugerencia() {
    this.reporte.markAllAsTouched();
    this.reporte.updateValueAndValidity();
    if (this.reporte.valid) {
      if (this.reporte.value.fechaFin < this.reporte.value.fechaInicio) {
        this.visible = true;
      } else {
        this.reporteService.obtenerReporteSugerencia(this.reporte.value.fechaInicio, this.reporte.value.fechaFin).subscribe(response => {
          this.listaReporteSugerencia = response;
        })
      }
    }
  }


}
