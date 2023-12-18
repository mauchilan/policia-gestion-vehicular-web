import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { VehiculoRoutes } from './vehiculo-routing.module';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculosNuevoComponent } from './vehiculos-nuevo/vehiculos-nuevo.component';


@NgModule({
  declarations: [
    VehiculosComponent,
    VehiculosNuevoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    ReactiveFormsModule,
    RouterModule.forChild(VehiculoRoutes)
  ]
})
export class VehiculoModule { }
