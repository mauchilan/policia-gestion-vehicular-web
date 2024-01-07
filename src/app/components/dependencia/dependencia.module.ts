import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependenciasRoutes } from './dependencia-routing.module';
import { RouterModule } from '@angular/router';
import { DistritosComponent } from './distritos/distritos.component';
import { CircuitosComponent } from './circuitos/circuitos.component';
import { SubcircuitosComponent } from './subcircuitos/subcircuitos.component';
import { DistritoNuevoComponent } from './distritos/distrito-nuevo/distrito-nuevo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DistritoEditarComponent } from './distritos/distrito-editar/distrito-editar.component';
import { CircuitoNuevoComponent } from './circuitos/circuito-nuevo/circuito-nuevo.component';
import { CircuitoEditarComponent } from './circuitos/circuito-editar/circuito-editar.component';
import { SubcircuitoNuevoComponent } from './subcircuitos/subcircuito-nuevo/subcircuito-nuevo.component';
import { SubcircuitoEditarComponent } from './subcircuitos/subcircuito-editar/subcircuito-editar.component';



@NgModule({
  declarations: [
    DistritosComponent,
    CircuitosComponent,
    SubcircuitosComponent,
    DistritoNuevoComponent,
    DistritoEditarComponent,
    CircuitoNuevoComponent,
    CircuitoEditarComponent,
    SubcircuitoNuevoComponent,
    SubcircuitoEditarComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    RouterModule.forChild(DependenciasRoutes)
  ],
  providers: [ConfirmationService, MessageService]
})
export class DependenciaModule { }
