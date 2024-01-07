import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';

import { VehiculoRoutes } from './vehiculo-routing.module';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculosNuevoComponent } from './vehiculos/vehiculos-nuevo/vehiculos-nuevo.component';
import { VehiculosEditarComponent } from './vehiculos/vehiculos-editar/vehiculos-editar.component';


@NgModule({
  declarations: [
    VehiculosComponent,
    VehiculosNuevoComponent,
    VehiculosEditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    PaginatorModule,
    RouterModule.forChild(VehiculoRoutes)
  ]
})
export class VehiculoModule { }
