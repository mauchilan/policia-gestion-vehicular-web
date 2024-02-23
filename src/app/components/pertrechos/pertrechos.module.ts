import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PertrechosRoutingModule } from './pertrechos-routing.module';
import { PertrechoComponent } from './pertrecho/pertrecho.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { PertrechoNuevoComponent } from './pertrecho/pertrecho-nuevo/pertrecho-nuevo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PertrechoEditarComponent } from './pertrecho/pertrecho-editar/pertrecho-editar.component';


@NgModule({
  declarations: [
    PertrechoComponent,
    PertrechoNuevoComponent,
    PertrechoEditarComponent
  ],
  imports: [
    ConfirmDialogModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    PertrechosRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule
  ]
})
export class PertrechosModule { }
