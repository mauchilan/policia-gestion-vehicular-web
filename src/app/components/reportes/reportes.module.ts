import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteSugerenciaComponent } from './reporte-sugerencia/reporte-sugerencia.component';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    ReporteSugerenciaComponent
  ],
  imports: [
    CalendarModule,
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    ReportesRoutingModule,
    TableModule
  ]
})
export class ReportesModule { }
