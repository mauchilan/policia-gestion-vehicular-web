import { Component, OnInit } from '@angular/core';
import { SubcircuitoBase } from '../subcircuito.base';
import { Dependencia } from '../../../../models/dependencia';

@Component({
  selector: 'app-subcircuito-nuevo',
  templateUrl: './subcircuito-nuevo.component.html'
})
export class SubcircuitoNuevoComponent extends SubcircuitoBase implements OnInit {

  visible: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit()
    this.createForm();
  }

  guardarSubcircuito(event: Event) {
    this.subcircuitoForm.markAllAsTouched();
    this.subcircuitoForm.updateValueAndValidity();
    if (!this.subcircuitoForm.valid) {
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
      message: 'Desea guardar el nuevo Subcircuito?',
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
    dependencia.tipoDependencia = "SUBCIRCUITO";
    dependencia.parentDependencia = this.model['idParentDependencia'].value;
    this.dependenciaService.grabarDependencia(dependencia).subscribe(() => {
      this.cancelar();
    })
  }

  cancelar() {
    this.router.navigate(['/dependencia/subcircuitos']);
  }

}
