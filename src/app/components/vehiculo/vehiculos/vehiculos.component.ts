import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html'
})
export class VehiculosComponent {

  constructor(public router:Router) {
  }

  openNuevoVehiculo() {
    this.router.navigate(['/vehiculo/nuevo-vehiculo']);
  }

}
