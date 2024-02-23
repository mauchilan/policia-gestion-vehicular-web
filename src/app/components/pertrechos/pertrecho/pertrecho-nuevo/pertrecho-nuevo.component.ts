import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CatalogoService } from '../../../../services/app/catalogo.service';
import { Catalogo } from '../../../../models/catalogo';
import { Pertrecho } from '../../../../models/pertrecho';
import { PertrechoService } from '../../../../services/app/pertrecho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pertrecho-nuevo',
  templateUrl: './pertrecho-nuevo.component.html',
  providers: [ConfirmationService, MessageService]
})
export class PertrechoNuevoComponent implements OnInit {

  pertrechoForm!: UntypedFormGroup;
  tipoArmas: Catalogo = {};
  visible: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder,
    private catalogoService: CatalogoService,
    private pertrechoService: PertrechoService,
    private confirmationService: ConfirmationService,
    private router: Router) {}

  ngOnInit(): void {
    this.pertrechoForm = this.formBuilder.group({
      codigo: new FormControl("", [Validators.required]),
      nombre: new FormControl("", [Validators.required]),
      descripcion: new FormControl("", [Validators.required]),
      tipoArma: new FormControl("", [Validators.required])
    });
    this.catalogoService.obtenerCatalogo('Tipo Arma', 'A').subscribe(response => {
      this.tipoArmas = response;
    });
  }

  guardarPertrecho(event: Event) {
    this.pertrechoForm.markAllAsTouched();
    this.pertrechoForm.updateValueAndValidity();
    if (!this.pertrechoForm.valid) {
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
      message: 'Desea guardar los cambios?',
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
    let pertrecho: Pertrecho = new Pertrecho;
    pertrecho.tipoArma = {}
    pertrecho.codigo = this.pertrechoForm.value.codigo;
    pertrecho.nombre = this.pertrechoForm.value.nombre;
    pertrecho.descripcion = this.pertrechoForm.value.descripcion;
    pertrecho.tipoArma!.idCatalogo = this.pertrechoForm.value.tipoArma;
    this.pertrechoService.grabarPertrecho(pertrecho).subscribe( () => {
      this.router.navigate(['/pertrechos/pertrecho']);
    });
  }

  cancelar() {
    this.router.navigate(['/pertrechos/pertrecho']);
  }

}
