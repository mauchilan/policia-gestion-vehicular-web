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

  get model() {
    return this.subcircuitoForm.controls;
  }

}
