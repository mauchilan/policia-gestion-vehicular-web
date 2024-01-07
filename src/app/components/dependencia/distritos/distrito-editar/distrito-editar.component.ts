import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DistritoBase } from '../distrito.base';
import { Dependencia } from '../../../../models/dependencia';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-distrito-editar',
  templateUrl: './distrito-editar.component.html',
  providers: [ConfirmationService, MessageService]
})
export class DistritoEditarComponent extends DistritoBase implements OnInit{

  @Input() distrito!: Dependencia;
  @Input() tipo!: string;
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  accion!: string;

  override ngOnInit(): void {
    super.ngOnInit();
    this.createForm();
    if (this.tipo === 'editar') {
      this.accion = 'Editar'
    } else {
      this.accion = 'Eliminar';
    }
    this.model['idLocalidad'].setValue(this.distrito.localidad?.idLocalidad);
    this.model['idDependencia'].setValue(this.distrito.idDependencia);
    this.model['nombreDependencia'].setValue(this.distrito.nombreDependencia);
  }

  cancelar() {
    this.complete.emit(true);
  }

  get model() {
    return this.distritoForm.controls;
  }
  

}
