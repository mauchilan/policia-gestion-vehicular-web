import { Component, EventEmitter, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MantenimientoDto } from '../../../models/mantenimiento.dto';
import { formatCurrency, formatDate } from '@angular/common';
import { VehiculoService } from '../../../services/app/vehiculo.service';
import { MantenimientoService } from '../../../services/app/mantenimiento.service';
import { TipoMantenimiento } from '../../../models/tipo.mantenimiento';
import { TipoMantenimientoService } from '../../../services/app/tipo.mantenimiento.service';
import { MantenimientoRequest } from '../../../models/mantenimiento.request';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {

  @Input() mantenimiento!: MantenimientoDto;
  @Input() estado!: string;
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  detalleSolicitud!: UntypedFormGroup;
  listaTipoMantenimiento: TipoMantenimiento[] = [];
  subtotal = 0;
  iva = 0;
  total = 0;

  constructor(private formBuilder: UntypedFormBuilder,
    private vehiculoService: VehiculoService,
    private mantenimientoService: MantenimientoService,
    private tipoMantenimientoService: TipoMantenimientoService) {}

  ngOnInit(): void {
    this.detalleSolicitud = this.formBuilder.group({
      idSolicitante : [{value: this.mantenimiento.idSolicitante, disabled: true }],
      solicitante : [{value: this.mantenimiento.solicitante, disabled: true }],
      fechaMantenimiento: [{value: formatDate(this.mantenimiento.fechaMantenimiento!, 'dd/MM/yyy', 'en-US'), disabled: true}],
      horaMantenimiento: [{value: formatDate(this.mantenimiento.horaMantenimiento!, 'HH:mm', 'en-US'), disabled: true}],
      tipoVehiculo: [{value: '', disabled: true}],
      marca: [{value: '', disabled: true}],
      modelo: [{value: '', disabled: true}],
      placa: [{value: '', disabled: true}],
      kilometraje: [{value: '', disabled: true}],
      tipoMantenimiento: new FormControl<TipoMantenimiento[] | null>(null),
      subtotal: [{value: formatCurrency(this.mantenimiento.subtotal!, 'en-US', '$', 'USD'), disabled: true}],
      iva: [{value: formatCurrency(this.mantenimiento.iva!, 'en-US', '$', 'USD'), disabled: true}],
      total: [{value: formatCurrency(this.mantenimiento.total!, 'en-US', '$', 'USD'), disabled: true}],
    });
    this.vehiculoService.obtenerVehiculo(this.mantenimiento.vehiculo!).subscribe(response => {
      this.detalleSolicitud.controls['tipoVehiculo'].setValue(response.tipoVehiculo?.descripcion);
      this.detalleSolicitud.controls['marca'].setValue(response.marca?.descripcion);
      this.detalleSolicitud.controls['modelo'].setValue(response.modelo?.descripcion);
      this.detalleSolicitud.controls['placa'].setValue(response.placa);
      this.detalleSolicitud.controls['kilometraje'].setValue(response.kilometraje);
    });
    if (this.estado === 'R') {
      this.tipoMantenimientoService.obtenerTipoMantenimiento().subscribe(response => {
        this.listaTipoMantenimiento = response;
      })
    }
    let tipoMantenimiento: any[] = [];
    this.mantenimiento.mantenimientoTipoMantenimientos?.forEach(tipo => {
      tipoMantenimiento.push(tipo.idTipoMantenimiento)
      this.detalleSolicitud.controls['tipoMantenimiento'].setValue(tipoMantenimiento);
    })
  }

  updateMantenimiento(accion: string) {
    let request = new MantenimientoRequest;
    request.id = this.mantenimiento.idMantenimiento;    
    if (accion === 'SN' || accion === 'T') {
      request.estado = accion;
    } 
    if (this.estado === 'R') {
      request.subtotal = this.subtotal;
      request.iva = this.iva;
      request.total = this.total;
      request.tipoMantenimiento = this.detalleSolicitud.controls['tipoMantenimiento'].value;
    } 
    if (this.estado === 'N') {
      request.estado = 'R';
    }
  
    this.mantenimientoService.updateMantenimiento(request).subscribe(response => {
      this.complete.emit(true);
    });
  }

  cancelar() {
    this.complete.emit(true);
  }

  escogerTipoMantenimientos() {
    const mantenimientos: TipoMantenimiento[] = this.detalleSolicitud.controls['tipoMantenimiento'].value;
    this.detalleSolicitud.controls['subtotal'].setValue(formatCurrency(0, 'en-US', '$', 'USD'));
    this.detalleSolicitud.controls['iva'].setValue(formatCurrency(0, 'en-US', '$', 'USD'));
    this.detalleSolicitud.controls['total'].setValue(formatCurrency(0, 'en-US', '$', 'USD'));
    this.subtotal = 0;
    mantenimientos.forEach(mantenimiento => {
      const tipo = this.listaTipoMantenimiento.filter(tipo => tipo.idTipoMantenimiento === mantenimiento);
      this.subtotal = this.subtotal + tipo[0].costo!;
      this.iva = (this.subtotal * 12) / 100;
      this.total = this.subtotal + this.iva;
      this.detalleSolicitud.controls['subtotal'].setValue(formatCurrency(this.subtotal, 'en-US', '$', 'USD'));      
      this.detalleSolicitud.controls['iva'].setValue(formatCurrency(this.iva, 'en-US', '$', 'USD'));      
      this.detalleSolicitud.controls['total'].setValue(formatCurrency(this.total, 'en-US', '$', 'USD'));
    });    
  }

}
