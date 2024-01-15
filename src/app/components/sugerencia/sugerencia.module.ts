import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SugerenciaRoutingModule } from './sugerencia-routing.module';
import { SugerenciaSolucitudComponent } from './public/sugerencia-solucitud/sugerencia-solucitud.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    SugerenciaSolucitudComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    SugerenciaRoutingModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class SugerenciaModule { }
