import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { RouterModule } from '@angular/router';
import { MantenimientoRoutes } from './mantenimiento-routing.module';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    SolicitudComponent
  ],
  imports: [
    ButtonModule,
    CalendarModule,
    CardModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RouterModule.forChild(MantenimientoRoutes),
    TableModule
  ]
})
export class MantenimientoModule { }
