import { Component, OnInit } from '@angular/core';
import { MantenimientoDto } from '../../../models/mantenimiento.dto';
import { MantenimientoService } from '../../../services/app/mantenimiento.service';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html'
})
export class OrdenTrabajoComponent implements OnInit {

  listaSolicitudes: MantenimientoDto[] = [];

  constructor(private mantenimientoService: MantenimientoService) {}

  ngOnInit(): void {
    this.mantenimientoService.obtenerMantenimientoEstado('T').subscribe(response => {
      this.listaSolicitudes = response;
    })
  }

}
