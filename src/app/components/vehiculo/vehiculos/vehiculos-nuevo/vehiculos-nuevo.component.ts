import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from 'primeng/api';
import { CatalogoService } from '../../../../services/app/catalogo.service';
import { Catalogo } from '../../../../models/catalogo';
import { Vehiculo } from '../../../../models/vehiculo';
import { VehiculoService } from '../../../../services/app/vehiculo.service';

@Component({
  selector: 'app-vehiculos-nuevo',
  templateUrl: './vehiculos-nuevo.component.html',
  providers: [ConfirmationService, MessageService]
})
export class VehiculosNuevoComponent {

  vehiculoForm!: UntypedFormGroup;
  catalogo: Catalogo = {};
  marcas?: Catalogo[] = [];
  modelos?: Catalogo[] = [];
  tipoVehiculos: any = [];
  tipoMarcas: any = [];
  tipoModelo: any = [];
  visible: boolean = false;
  vehiculo: Vehiculo = new Vehiculo;

  constructor(public formBuilder: UntypedFormBuilder,
    public catalogoService: CatalogoService,
    private confirmationService: ConfirmationService,
    private vehiculoService: VehiculoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.vehiculoForm = this.formBuilder.group({
      tipoVehiculo: new FormControl("", [Validators.required]),
      placa: new FormControl("", [Validators.required]),
      chasis: new FormControl("", [Validators.required]),
      marca: new FormControl("", [Validators.required]),
      modelo: new FormControl("", [Validators.required]),
      motor: new FormControl("", [Validators.required]),
      kilometraje: new FormControl("", [Validators.required]),
      cilindraje: new FormControl("", [Validators.required]),
      capacidadCarga: new FormControl("", [Validators.required]),
      capacidadPasajero: new FormControl("", [Validators.required]),
    });
    this.obtenerCatalogo('Tipo Vehiculo');
    this.vehiculo.tipoVehiculo = {};
    this.vehiculo.marca = {};
    this.vehiculo.modelo = {};
  }

  obtenerCatalogo(tipo: string) {
    this.catalogoService.obtenerCatalogo(tipo, 'A').subscribe(response => {
      this.catalogo = response;
      response.childs?.forEach(child => {
        this.tipoVehiculos.push({ "name": child.descripcion, "code": child.idCatalogo })
      })
    });
  }

  obtenerMarcas() {
    this.marcas = this.catalogo.childs?.filter(marca => marca.idCatalogo == this.vehiculoForm.controls['tipoVehiculo'].value.code);
    this.marcas![0].childs?.forEach(child => {
      this.tipoMarcas.push({ "name": child.descripcion, "code": child.idCatalogo })
    })
  }

  obtenerModelo() {
    this.modelos = this.marcas![0].childs?.filter(modelo => modelo.idCatalogo == this.vehiculoForm.controls['marca'].value.code);
    this.modelos![0].childs?.forEach(child => {
      this.tipoModelo.push({ "name": child.descripcion, "code": child.idCatalogo })
    })
  }

  guardarVehiculo(event: Event) {
    this.vehiculoForm.markAllAsTouched();
    this.vehiculoForm.updateValueAndValidity();
    if (!this.vehiculoForm.valid) {
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
    this.vehiculo.placa = this.vehiculoForm.value.placa;
    this.vehiculo.chasis = this.vehiculoForm.value.chasis;
    this.vehiculo.motor = this.vehiculoForm.value.motor;
    this.vehiculo.kilometraje = this.vehiculoForm.value.kilometraje;
    this.vehiculo.cilindraje = this.vehiculoForm.value.cilindraje;
    this.vehiculo.capacidadCarga = this.vehiculoForm.value.capacidadCarga;
    this.vehiculo.capacidadPasajero = this.vehiculoForm.value.capacidadPasajero;
    //this.vehiculo.modelo = this.vehiculoForm.value.modelo.code;
    this.vehiculo.tipoVehiculo!.idCatalogo = this.vehiculoForm.value.tipoVehiculo.code;
    this.vehiculo.marca!.idCatalogo = this.vehiculoForm.value.marca.code;
    this.vehiculo.modelo!.idCatalogo = this.vehiculoForm.value.modelo.code;
    this.vehiculoService.crearVehiculo(this.vehiculo).subscribe( () => {
      this.router.navigate(['/vehiculo/vehiculos']);
    });
  }

  cancelar() {
    this.router.navigate(['/vehiculo/vehiculos']);
  }

}
