import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehiculo } from '../../../../models/vehiculo';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalidadService } from '../../../../services/app/localidad.service';
import { DependenciaService } from '../../../../services/app/dependencia.service';
import { ConfirmationService } from 'primeng/api';
import { Localidad } from '../../../../models/localidad';
import { Dependencia } from '../../../../models/dependencia';
import { VehiculoService } from '../../../../services/app/vehiculo.service';

@Component({
  selector: 'app-vinculacion-vehicular-asignacion',
  templateUrl: './vinculacion-vehicular-asignacion.component.html'
})
export class VinculacionVehicularAsignacionComponent implements OnInit {

  @Input() vehiculos!: Vehiculo[];
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  subcircuitoForm!: UntypedFormGroup;
  provincias: Localidad[] = [];
  //cantones: Localidad[] = [];
  //parroquias: Localidad[] = [];
  distritos: Dependencia[] = [];
  circuitos: Dependencia[] = [];
  subcircuitos: Dependencia[] = [];
  visible: boolean = false;

  constructor(public formBuilder: UntypedFormBuilder,
    public router: Router,
    public localidadService: LocalidadService,
    public dependenciaService: DependenciaService,
    public vehiculoService: VehiculoService,
    public confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.subcircuitoForm = this.formBuilder.group({
      idProvincia: new FormControl("", [Validators.required]),
      //idCanton: new FormControl("", [Validators.required]),
      idDistrito: new FormControl("", [Validators.required]),
      idCircuito: new FormControl("", [Validators.required]),
      idSubcircuito: new FormControl("", [Validators.required]),
      //idDependencia: new FormControl("", [Validators.required]),
      //nombreDependencia: new FormControl("", [Validators.required]),
    });
    this.localidadService.obtenerProvincias().subscribe(response => {
      this.provincias = response;
    });
  }

  obtenerDistritos() {
    const localidad = new Localidad;
    localidad.idLocalidad = this.model["idProvincia"].value;
    this.dependenciaService.obtenerDependenciaLocalidad(localidad).subscribe(response => {
      this.distritos = response;
    })
  }

  obtenerCircuito() {
    this.dependenciaService.obtenerDependenciaParent(this.model["idDistrito"].value).subscribe(response => {
      this.circuitos = response;
    })
  }

  obtenerSubircuito() {
    this.dependenciaService.obtenerDependenciaParent(this.model["idCircuito"].value).subscribe(response => {
      this.subcircuitos = response;
    })
  }

  guardarAsignacionDependencia(event: Event) {
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
      message: 'Desea asignar los vehiculos al subcircuito?',
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
    this.vehiculos.forEach(vehiculo => {
      vehiculo.idDependencia = this.model["idSubcircuito"].value
    });
    this.vehiculoService.vincularVehiculos(this.vehiculos).subscribe(() => {
      this.cancelar();
    })
  }

  cancelar() {
    this.complete.emit(true);
  }

  get model() {
    return this.subcircuitoForm.controls;
  }
}
