import { Component, OnInit } from '@angular/core';
import { CircuitoBase } from '../circuito.base';
import { Dependencia } from '../../../../models/dependencia';

@Component({
  selector: 'app-circuito-nuevo',
  templateUrl: './circuito-nuevo.component.html'
})
export class CircuitoNuevoComponent extends CircuitoBase implements OnInit {

  visible: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.createForm();
  }

  guardarDistrito(event: Event) {
    this.circuitoForm.markAllAsTouched();
    this.circuitoForm.updateValueAndValidity();
    if (!this.circuitoForm.valid) {
      this.showDialog();
    } else {
      this.mostrarMensaje(event);
    }
  }

  showDialog() {
    this.visible = true;
  }

  mostrarMensaje(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Desea guardar el nuevo Circuito?',
      header: 'Mensaje',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.enviarDatos();
      }
    });
  }

  enviarDatos() {
    const dependencia: Dependencia = new Dependencia;
    dependencia.localidad = {}
    dependencia.idDependencia = this.model['idDependencia'].value;
    dependencia.nombreDependencia = this.model['nombreDependencia'].value;
    dependencia.localidad!.idLocalidad = this.model['idLocalidad'].value;
    dependencia.tipoDependencia = "CIRCUITO";
    dependencia.parentDependencia = this.model['idParentDependencia'].value;
    this.dependenciaService.grabarDependencia(dependencia).subscribe(() => {
      this.cancelar();
    })
  }

  cancelar() {
    this.router.navigate(['/dependencia/circuitos']);
  }

}
