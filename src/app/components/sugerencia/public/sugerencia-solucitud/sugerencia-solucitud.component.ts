import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Localidad } from '../../../../models/localidad';
import { SugerenciaService } from '../../../../services/app/sugerencia.service';
import { Dependencia } from '../../../../models/dependencia';
import { Catalogo } from '../../../../models/catalogo';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Sugerencia } from '../../../../models/sugerencia';

@Component({
  selector: 'app-sugerencia-solucitud',
  templateUrl: './sugerencia-solucitud.component.html'
})
export class SugerenciaSolucitudComponent implements OnInit {

  sugerencia!: UntypedFormGroup;
  listaProvincias: Localidad[] = [];
  listaDistritos: Dependencia[] = [];
  listaCircuito: Dependencia[] = [];
  listaSubcircuito: Dependencia[] = [];
  listaCatalogo: Catalogo[] = [];
  visible: boolean = false;

  constructor(public formBuilder: UntypedFormBuilder, private sugerenciaService: SugerenciaService,
    private confirmationService: ConfirmationService,
    private router: Router) {}

  ngOnInit(): void {
    this.sugerencia = this.formBuilder.group({
      provincia: new FormControl(""),
      distrito: new FormControl(""),
      circuito: new FormControl(""),
      subcircuito: new FormControl("", [Validators.required]),
      tipo: new FormControl("", [Validators.required]),
      detalle: new FormControl("", [Validators.required, Validators.minLength(100)]),
      contacto: new FormControl(""),
      nombres: new FormControl("", [Validators.required]),
      apellidos: new FormControl("", [Validators.required]),
    });
    this.sugerenciaService.obtenerProvincias().subscribe(response => {
      this.listaProvincias = response;
    });
    this.sugerenciaService.obtenerCatalogo('Tipo Sugerencia', 'A').subscribe(response => {
      this.listaCatalogo = response.childs!;
    })
  }

  obtenerDistritos() {
    const localidad = new Localidad;
    localidad.idLocalidad = this.sugerencia.controls["provincia"].value;
    this.sugerenciaService.obtenerDependenciaLocalidad(localidad).subscribe(response => {
      this.listaDistritos = response;
    })
  }

  obtenerCircuito() {
    this.sugerenciaService.obtenerDependenciaParent(this.sugerencia.controls["distrito"].value).subscribe(response => {
      this.listaCircuito = response;
    })
  }

  obtenerSubircuito() {
    this.sugerenciaService.obtenerDependenciaParent(this.sugerencia.controls["circuito"].value).subscribe(response => {
      this.listaSubcircuito = response;
    })
  }

  guardarSugerencia(event: Event) {
    this.sugerencia.markAllAsTouched();
    this.sugerencia.updateValueAndValidity();
    if (this.sugerencia.valid) {
      this.mostrarMensaje(event);
    } else {
      this.showDialog();
    }
  }

  showDialog() {
    this.visible = true;
  }

  mostrarMensaje(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Desea enviar los datos de la sugerencia o reclamo?',
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
    let sugerencia = new Sugerencia;
    sugerencia.dependencia = this.sugerencia.value.subcircuito;
    sugerencia.tipo = this.sugerencia.value.tipo;
    sugerencia.detalle = this.sugerencia.value.detalle;
    sugerencia.contacto = this.sugerencia.value.contacto;
    sugerencia.nombres = this.sugerencia.value.nombres;
    sugerencia.apellidos = this.sugerencia.value.apellidos;
    sugerencia.dependencia = this.sugerencia.value.subcircuito;
    this.sugerenciaService.grabar(sugerencia).subscribe( () => {
      this.regresar();
    });
  }

  regresar() {
    this.router.navigate(['/']);
  }

}
