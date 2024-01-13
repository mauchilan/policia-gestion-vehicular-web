import { Component, OnInit } from '@angular/core';
import { VehiculoPersonalService } from '../../../services/app/vehiculo.personal.service';
import { AuthService } from '../../../services/security/auth.service';
import { VehiculoService } from '../../../services/app/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';
import { PersonalService } from '../../../services/app/personal.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html'
})
export class SolicitudComponent implements OnInit {

  visible: boolean = false;
  visibleSolicitud: boolean = false;
  mostrarPantalla:boolean = true;
  vehiculos: Vehiculo[] = [];
  user: any;
  datosUsuario: any = {};

  constructor(private vehiculoPersonalService: VehiculoPersonalService, 
    private authService: AuthService,
    private vehiculoService: VehiculoService,
    private personalService: PersonalService) {}

  ngOnInit(): void {
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
      console.log(response);
      this.datosUsuario = response;
    });
  }

  visualizarSolicitud(vehiculo: Vehiculo) {
    this.visibleSolicitud = true;
  }

}
