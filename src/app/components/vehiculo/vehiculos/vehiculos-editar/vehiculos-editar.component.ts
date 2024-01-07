import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehiculo } from '../../../../models/vehiculo';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Catalogo } from '../../../../models/catalogo';
import { CatalogoService } from '../../../../services/app/catalogo.service';
import { VehiculoService } from '../../../../services/app/vehiculo.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-vehiculos-editar',
  templateUrl: './vehiculos-editar.component.html',
  providers: [ConfirmationService, MessageService]
})
export class VehiculosEditarComponent  {

  @Input() vehiculo!: Vehiculo;
  @Input() tipo!: string;
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  accion!: string;
  vehiculoForm!: UntypedFormGroup;
  tipoVehiculos: Catalogo = {};
  tipoMarcas: Catalogo = {};
  tipoModelo: Catalogo = {};
  visible: boolean = false;
  
  constructor(public formBuilder: UntypedFormBuilder, 
        private catalogoService: CatalogoService,
        private vehiculoService: VehiculoService,
        private router: Router,
        private confirmationService: ConfirmationService) {
    
  }

  ngOnInit(): void {
    if (this.tipo === 'editar') {
      this.accion = 'Editar'
    } else {
      this.accion = 'Eliminar';
    }
    this.vehiculoForm = this.formBuilder.group({
      tipoVehiculo: new FormControl(this.vehiculo.tipoVehiculo?.idCatalogo, [Validators.required]),
      placa: new FormControl(this.vehiculo.placa, [Validators.required]),
      chasis: new FormControl(this.vehiculo.chasis, [Validators.required]),
      marca: new FormControl(this.vehiculo.marca?.idCatalogo, [Validators.required]),
      modelo: new FormControl(this.vehiculo.modelo?.idCatalogo, [Validators.required]),
      motor: new FormControl(this.vehiculo.motor, [Validators.required]),
      kilometraje: new FormControl(this.vehiculo.kilometraje, [Validators.required]),
      cilindraje: new FormControl(this.vehiculo.cilindraje, [Validators.required]),
      capacidadCarga: new FormControl(this.vehiculo.capacidadCarga, [Validators.required]),
      capacidadPasajero: new FormControl(this.vehiculo.capacidadPasajero, [Validators.required]),
    });
    this.obtenerCatalogo('Tipo Vehiculo');
  }

  obtenerCatalogo(tipo: string) {
    this.catalogoService.obtenerCatalogo(tipo, 'A').subscribe(response => {
      this.tipoVehiculos = response;
      this.obtenerMarcas();
      this.obtenerModelo();
    });
  }

  obtenerMarcas() {
    const marcas = this.tipoVehiculos.childs?.filter(marca => marca.idCatalogo == this.vehiculoForm.controls['tipoVehiculo'].value);
    this.tipoMarcas = marcas![0];
  }

  obtenerModelo() {
    const modelos = this.tipoMarcas.childs?.filter(modelo => modelo.idCatalogo == this.vehiculoForm.controls['marca'].value);
    this.tipoModelo = modelos![0];
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
    let mensaje;
    if (this.tipo === 'editar') {
      mensaje = 'Desea guardar los cambios?'
    } else {
      mensaje = 'Desea eliminar el vehiculo?'
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: mensaje,
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
    if (this.tipo === 'editar') {
      this.vehiculo.placa = this.vehiculoForm.value.placa;
      this.vehiculo.chasis = this.vehiculoForm.value.chasis;
      this.vehiculo.motor = this.vehiculoForm.value.motor;
      this.vehiculo.kilometraje = this.vehiculoForm.value.kilometraje;
      this.vehiculo.cilindraje = this.vehiculoForm.value.cilindraje;
      this.vehiculo.capacidadCarga = this.vehiculoForm.value.capacidadCarga;
      this.vehiculo.capacidadPasajero = this.vehiculoForm.value.capacidadPasajero;
      this.vehiculo.tipoVehiculo!.idCatalogo = this.vehiculoForm.value.tipoVehiculo;
      this.vehiculo.marca!.idCatalogo = this.vehiculoForm.value.marca;
      this.vehiculo.modelo!.idCatalogo = this.vehiculoForm.value.modelo;
      this.vehiculoService.crearVehiculo(this.vehiculo).subscribe( () => {
        this.complete.emit(true);
      });
    } else {
      this.vehiculoService.eliminarVehiculo(this.vehiculo.idVehichulo!).subscribe(() => {
        this.complete.emit(true);
      });
    }
  }


  cancelar() {
    this.complete.emit(true);
  }

}
