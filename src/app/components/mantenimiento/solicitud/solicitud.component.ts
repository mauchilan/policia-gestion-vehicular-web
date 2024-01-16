import { Component, OnInit } from '@angular/core';
import { VehiculoPersonalService } from '../../../services/app/vehiculo.personal.service';
import { AuthService } from '../../../services/security/auth.service';
import { VehiculoService } from '../../../services/app/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';
import { PersonalService } from '../../../services/app/personal.service';
import { Mantenimiento } from '../../../models/mantenimiento';
import { MantenimientoService } from '../../../services/app/mantenimiento.service';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html'
})
export class SolicitudComponent implements OnInit {

  visible: boolean = false;
  visibleSolicitud: boolean = false;
  visibleMensajes: boolean = false;
  mostrarPantalla:boolean = true;
  vehiculos: Vehiculo[] = [];
  vehiculoSeleccionado!: Vehiculo;  
  mensaje!: string;
  user: any;
  datosUsuario: any = {};
  solicitud!: UntypedFormGroup;

  constructor(private vehiculoPersonalService: VehiculoPersonalService, 
    private authService: AuthService,
    private vehiculoService: VehiculoService,
    private personalService: PersonalService,
    private mantenimientoService: MantenimientoService,
    public confirmationService: ConfirmationService,
    private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.solicitud = this.formBuilder.group({
      fechaMantenimiento: new FormControl("", [Validators.required]),
      kilometrajeActual: new FormControl("", [Validators.required]),
      observaciones: new FormControl(""),
    });
    this.user = this.authService.getUserStorage();
    this.obtenerDatosUsuario(this.user.id);
    this.vehiculoPersonalService.obtenerVinculacionPorPersonal(this.user.id).subscribe(response => {
      if (response.length > 0) {
        let idVehiculos: any[] = [];
        response.forEach(data => {
          idVehiculos.push(data.idVehiculo);
        });
        this.obtenerVehiculo(idVehiculos)
      } else {
        this.visible = true;
        this.mostrarPantalla = false;
      }
    });
  }

  obtenerVehiculo(idVehiculo: any[]) {
    this.vehiculoService.obtenerVehiculo(idVehiculo).subscribe(response => {
      this.vehiculos = response;
    });
  }

  obtenerDatosUsuario(id: string) {
    this.personalService.obtenerUsuario(id).subscribe(response => {
      this.datosUsuario = response;
    });
  }

  visualizarSolicitud(vehiculo: Vehiculo) {
    this.vehiculoSeleccionado = vehiculo;
    this.visibleSolicitud = true;
  }

  validarKilometraje() {
    if (Number(this.solicitud.value.kilometrajeActual) <= Number(this.vehiculoSeleccionado.kilometraje)) {
      this.mensaje = 'El kilometraje actual ' + this.solicitud.value.kilometrajeActual + ', no puede ser menor al kilometraje del vehiculo ' + this.vehiculoSeleccionado.kilometraje;
      this.visibleMensajes = true;
      this.solicitud.controls['kilometrajeActual'].setErrors({'incorrect': true});
    } else {
      this.solicitud.controls['kilometrajeActual'].setErrors(null);
    }
    this.solicitud.updateValueAndValidity();
  }

  grabarMantenimiento(event: Event) {
    this.solicitud.markAllAsTouched();
    this.solicitud.updateValueAndValidity();
    if (!this.solicitud.valid) {
      this.showDialog();
    } else {
      this.enviarDatos();
    }
  }

  showDialog() {
    this.mensaje = 'No se han llenado todo los campos obligatorios. ';
    this.visibleMensajes = true;
  }

  mostrarMensaje(event: Event) {
    this.visibleSolicitud = false;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Desea crear la solicitud de Mantenimiento?',
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
    this.visibleSolicitud = true;
    let mantenimiento = new Mantenimiento;
    mantenimiento.idPersonal = this.user.id;
    mantenimiento.idVehichulo = this.vehiculoSeleccionado.idVehichulo;
    mantenimiento.kmActuall = this.solicitud.value.kilometrajeActual;
    mantenimiento.fechaMantenimiento = this.solicitud.value.fechaMantenimiento;
    mantenimiento.observaciones = this.solicitud.value.observaciones;
    this.mantenimientoService.grabarMantenimiento(mantenimiento).subscribe(response => {
      this.cerrarDialogo();
      this.mensaje = 'Los datos fueron creado correctamente';
      this.visibleMensajes = true;
    })
  }

  cerrarDialogo() {
    this.visibleSolicitud = false;
  }


}
