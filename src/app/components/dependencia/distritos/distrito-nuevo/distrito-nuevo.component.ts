import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LocalidadService } from '../../../../services/app/localidad.service';
import { Localidad } from '../../../../models/localidad';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Dependencia } from '../../../../models/dependencia';
import { DependenciaService } from '../../../../services/app/dependencia.service';

@Component({
  selector: 'app-distrito-nuevo',
  templateUrl: './distrito-nuevo.component.html',
  providers: [ConfirmationService, MessageService]
})
export class DistritoNuevoComponent {

  distritoForm!: UntypedFormGroup;
  visible: boolean = false;
  localidades: Localidad[] = []

  constructor(public formBuilder: UntypedFormBuilder,
              private router: Router,
              private confirmationService: ConfirmationService,
              private localidadService: LocalidadService,
              private dependenciaService: DependenciaService) {}

  ngOnInit(): void {
    this.distritoForm = this.formBuilder.group({
      idLocalidad: new FormControl("", [Validators.required]),
      idDependencia: new FormControl("", [Validators.required]),
      nombreDependencia: new FormControl("", [Validators.required]),
    });
    this.localidadService.obtenerProvincias().subscribe(reponse => {
      this.localidades = reponse;
    });
  }

  guardarDistrito(event: Event) {
    this.distritoForm.markAllAsTouched();
    this.distritoForm.updateValueAndValidity();
    if (!this.distritoForm.valid) {
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
      message: 'Desea guardar el nuevo Distrito?',
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
    dependencia.idDependencia = this.distritoForm.value.idDependencia;
    dependencia.nombreDependencia = this.distritoForm.value.nombreDependencia;
    dependencia.localidad!.idLocalidad = this.distritoForm.value.idLocalidad;
    dependencia.tipoDependencia = "DISTRITO";
    this.dependenciaService.grabarDependencia(dependencia).subscribe(() => {
      this.cancelar();
    })
  }

  cancelar() {
    this.router.navigate(['/dependencia/distritos']);
  }

}
