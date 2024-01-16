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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    RouterModule.forChild(MantenimientoRoutes),
    TableModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class MantenimientoModule { }
