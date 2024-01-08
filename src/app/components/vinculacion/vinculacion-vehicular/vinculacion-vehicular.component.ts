import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { VehiculoService } from '../../../services/app/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';
import { VinculacionVehicularAsignacionComponent } from './vinculacion-vehicular-asignacion/vinculacion-vehicular-asignacion.component';

@Component({
  selector: 'app-vinculacion-vehicular',
  templateUrl: './vinculacion-vehicular.component.html'
})
export class VinculacionVehicularComponent {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;

  pageable: any = {};
  vehiculos: Vehiculo[] = [];
  vehiculosSelected: Vehiculo[] = [];

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.buscarVehiculo(0,10);
  }

  buscarVehiculo(page: number, size: number) {
    this.vehiculoService.buscarVehiculos(page, size).subscribe(response => {
      this.pageable = response;
      this.vehiculos = response.content;
    });
  }

  vincularVehiculos() {
    this.dynamicContent = true;
    if (this.dynamicInsert) {
      this.dynamicInsert.clear();
      let dynamicComp = this.dynamicInsert?.createComponent(VinculacionVehicularAsignacionComponent).instance;
      dynamicComp.vehiculos = this.vehiculosSelected;
      dynamicComp?.complete.subscribe(complete => {
        if (complete) {
          this.dynamicContent = false;
          this.dynamicContent = false;
        }
      });
    }
  }

  vincularVehiculo(vehiculo: Vehiculo) {
    this.vehiculosSelected = [];
    this.vehiculosSelected.push(vehiculo)
    this.vincularVehiculos();
  }

}
