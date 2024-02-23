import { Component, OnInit } from '@angular/core';
import { MantenimientoDto } from '../../../models/mantenimiento.dto';
import { MantenimientoService } from '../../../services/app/mantenimiento.service';
import { ReporteService } from '../../../services/app/reporte.service';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html'
})
export class OrdenTrabajoComponent implements OnInit {

  listaSolicitudes: MantenimientoDto[] = [];

  constructor(private mantenimientoService: MantenimientoService,
    private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.mantenimientoService.obtenerMantenimientoEstado('T').subscribe(response => {
      this.listaSolicitudes = response;
    })
  }

  imrpimirOrdenes() {
    this.reporteService.obtenerOrden().subscribe(response => {
      let file = new Blob([response], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }

  descargarOrdenes() {
    this.reporteService.obtenerOrden().subscribe(response => {
      let file = new Blob([response], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(file);
      const downloadLink = document.createElement("a");
      downloadLink.href = fileURL;
      downloadLink.download = 'orden.pdf';
      downloadLink.click();
      //window.open(fileURL);
    })
  }

}
