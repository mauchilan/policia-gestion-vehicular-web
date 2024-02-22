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
import { ListboxModule } from 'primeng/listbox';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';

@NgModule({
  declarations: [
    SolicitudComponent,
    RegistroComponent,
    RecepcionComponent,
    DetalleComponent,
    OrdenTrabajoComponent
  ],
  imports: [
    ButtonModule,
    CalendarModule,
    CardModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ListboxModule,
    ReactiveFormsModule,
    RouterModule.forChild(MantenimientoRoutes),
    TableModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class MantenimientoModule { }
