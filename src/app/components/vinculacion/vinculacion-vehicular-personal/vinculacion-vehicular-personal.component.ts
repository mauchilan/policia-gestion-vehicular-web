import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Localidad } from '../../../models/localidad';
import { Dependencia } from '../../../models/dependencia';
import { ConfirmationService } from 'primeng/api';
import { DependenciaService } from '../../../services/app/dependencia.service';
import { LocalidadService } from '../../../services/app/localidad.service';
import { PersonalService } from '../../../services/app/personal.service';
import { Vehiculo } from '../../../models/vehiculo';
import { VehiculoService } from '../../../services/app/vehiculo.service';
import { User } from '../../../models/user';
import { VehiculoPersonalService } from '../../../services/app/vehiculo.personal.service';
import { VehiculoPersonal } from '../../../models/vehiculo.personal';

@Component({
  selector: 'app-vinculacion-vehicular-personal',
  templateUrl: './vinculacion-vehicular-personal.component.html'
})
export class VinculacionVehicularPersonalComponent {

  subcircuitoForm!: UntypedFormGroup;
  provincias: Localidad[] = [];
  distritos: Dependencia[] = [];
  circuitos: Dependencia[] = [];
  subcircuitos: Dependencia[] = [];
  vehiculos: Vehiculo[] = [];
  personals: User[] = [];
  visible: boolean = false;

  constructor(public formBuilder: UntypedFormBuilder,
    public localidadService: LocalidadService,
    public dependenciaService: DependenciaService,
    public personalService: PersonalService,
    private vehiculoService: VehiculoService,
    private vehiculoPersonalService: VehiculoPersonalService,
    public confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.subcircuitoForm = this.formBuilder.group({
      idProvincia: new FormControl("", [Validators.required]),
      idDistrito: new FormControl("", [Validators.required]),
      idCircuito: new FormControl("", [Validators.required]),
      idSubcircuito: new FormControl("", [Validators.required]),
      idVehiculo: new FormControl("", [Validators.required]),
      idPersonal: new FormControl("", [Validators.required]),
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

  obtenerVehiculoPorDependencia() {
    this.vehiculoService.obtenerVehiculoPorDependencia(this.model["idSubcircuito"].value).subscribe(response => {
      this.vehiculos = response;
    })
  }

  obtenerPersonalPorDependencia() {
    this.personalService.obtenerPersonalPorDependencia('idDependencia', this.model["idSubcircuito"].value).subscribe(response => {
      this.personals = response;
    })
  }

  guardarAsignacionVehiculoPersonal(event: Event) {
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
      message: 'Desea asignar el vehiculo al personal',
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
    let vehiculoPersonal = new VehiculoPersonal;
    vehiculoPersonal.idPersonal = this.model["idPersonal"].value;
    const vehiculo = this.vehiculos.filter(data => data.placa === this.model["idVehiculo"].value)
    vehiculoPersonal.idVehiculo = vehiculo[0].idVehichulo;
    this.vehiculoPersonalService.grabarVehiculoPersonal(vehiculoPersonal).subscribe(() => {
      window.location.reload()
    })
  }

  cancelar() {
    window.location.reload();
  }

  get model() {
    return this.subcircuitoForm.controls;
  }

}
