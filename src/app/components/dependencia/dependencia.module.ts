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



@NgModule({
  declarations: [
    DistritosComponent,
    CircuitosComponent,
    SubcircuitosComponent,
    DistritoNuevoComponent
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
  ]
})
export class DependenciaModule { }
