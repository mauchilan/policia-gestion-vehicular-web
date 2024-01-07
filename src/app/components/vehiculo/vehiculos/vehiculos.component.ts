import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { Vehiculo } from '../../../models/vehiculo';
import { VehiculoService } from '../../../services/app/vehiculo.service';
import { VehiculosEditarComponent } from './vehiculos-editar/vehiculos-editar.component';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html'
})
export class VehiculosComponent {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;

  pageable: any = {}
  vehiculos: Vehiculo[] = []
  first: number = 0;
  rows: number = 10;
  options = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 50, value: 50 }
  ];

  constructor(public router: Router, private vehiculoService: VehiculoService) {
  }

  ngOnInit(): void {
    this.pageable.pageable = {};
    this.pageable.pageable.pageNumber = 0;
    this.buscarVehiculo(0,10);
  }

  buscarVehiculo(page: number, size: number) {
    this.vehiculoService.buscarVehiculos(page, size).subscribe(response => {
      this.pageable = response;
      this.vehiculos = response.content;
    });
  }

  onPageChangeDrop(event: any) {
    this.buscarVehiculo(this.first, this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.buscarVehiculo(event.page, this.pageable.size);
  }

  openNuevoVehiculo() {
    this.router.navigate(['/vehiculo/nuevo-vehiculo']);
  }

  openEditVehiculo(tipo: string, vehiculo: Vehiculo) {
    this.dynamicContent = true;
    if (this.dynamicInsert) {
      this.dynamicInsert.clear();
      let dynamicComp = this.dynamicInsert?.createComponent(VehiculosEditarComponent).instance;
      dynamicComp.vehiculo = vehiculo;
      dynamicComp.tipo = tipo;
      dynamicComp?.complete.subscribe(complete => {
        if (complete) {
          this.dynamicContent = false;
          this.dynamicContent = false;
        }
      });
    }
  }

}
