import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MantenimientoService } from '../../../services/app/mantenimiento.service';
import { MantenimientoDto } from '../../../models/mantenimiento.dto';
import { DetalleComponent } from '../detalle/detalle.component';
import { VehiculoService } from '../../../services/app/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html'
})
export class RecepcionComponent implements OnInit {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;

  listaSolicitudes: MantenimientoDto[] = [];
  titulo = "Recepci\u00F3n de solicitudes de Mantenimiento"
  private estado = 'N';
  private registro = "registro";

  constructor(private mantenimientoService: MantenimientoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.url[0].path);
    if (this.registro === this.activatedRoute.snapshot.url[0].path) {
      this.titulo = "Registro de solicitudes de Mantenimiento";
      this.estado = 'R';
    }
    this.obtenerLista(this.estado);
  }

  openDetalle(solicitud: MantenimientoDto) {
    this.dynamicContent = true;
    if (this.dynamicInsert) {
      this.dynamicInsert.clear();
      let dynamicComp = this.dynamicInsert?.createComponent(DetalleComponent).instance;
      dynamicComp.mantenimiento = solicitud;
      dynamicComp.estado = this.estado;
      dynamicComp?.complete.subscribe(complete => {
        if (complete) {
          this.dynamicContent = false;
          this.obtenerLista(this.estado);
        }
      });
    }
  }

  obtenerLista(estado: string) {
    this.mantenimientoService.obtenerMantenimientoEstado(estado).subscribe(response => {
      this.listaSolicitudes = response;
    })
  }

}
