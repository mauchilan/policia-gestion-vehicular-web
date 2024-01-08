import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VinculacionPersonalComponent } from './vinculacion-personal/vinculacion-personal.component';
import { VinculacionVehicularComponent } from './vinculacion-vehicular/vinculacion-vehicular.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VinculacionRoutes } from './vinculacion-routing.module';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { VinculacionVehicularAsignacionComponent } from './vinculacion-vehicular/vinculacion-vehicular-asignacion/vinculacion-vehicular-asignacion.component';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { VinculacionPersonalAsignacionComponent } from './vinculacion-personal/vinculacion-personal-asignacion/vinculacion-personal-asignacion.component';
import { VinculacionVehicularPersonalComponent } from './vinculacion-vehicular-personal/vinculacion-vehicular-personal.component';

@NgModule({
  declarations: [
    VinculacionPersonalComponent,
    VinculacionVehicularComponent,
    VinculacionVehicularAsignacionComponent,
    VinculacionPersonalAsignacionComponent,
    VinculacionVehicularPersonalComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule.forChild(VinculacionRoutes),
    TableModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class VinculacionModule { }
