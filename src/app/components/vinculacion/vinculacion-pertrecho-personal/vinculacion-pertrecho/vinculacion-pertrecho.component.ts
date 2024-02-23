import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PertrechoService } from '../../../../services/app/pertrecho.service';
import { Pertrecho } from '../../../../models/pertrecho';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-vinculacion-pertrecho',
  templateUrl: './vinculacion-pertrecho.component.html',
  providers: [ConfirmationService, MessageService]
})
export class VinculacionPertrechoComponent implements OnInit {

  @Input() personal!: any;
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  listaPertrechos: Pertrecho[] = [];
  pertrechoSelectd: Pertrecho = {};
  visible: boolean = false;
  mensaje = '';

  constructor(private pertrechoService: PertrechoService,
    private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    console.log(this.personal)
    this.pertrechoService.buscarPertrecoSinAsignar().forEach(response => {
      this.listaPertrechos = response;
    });
  }

  grabarAsignacion(event: any) {
    if (Object.keys(this.pertrechoSelectd).length === 0) {
      this.mensaje = "No ha escogido un Pertrecho para la asignacion."
      this.visible = true;
    } else {
      this.pertrechoService.buscarPertrechoPorPersonal(this.personal.id).subscribe(response => {
        if (response !== null) {
          this.mensaje = "EL Personal ya tiene asigando un pertrecho, no se puede asignar"
          this.visible = true;
        } else {
          this.mostrarMensaje(event);
        }
      });
    }
  }

  mostrarMensaje(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Desea guardar los datos?',
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
    this.pertrechoSelectd.idPersonal = this.personal.id;
    this.pertrechoSelectd.fechaRegistroPersonal = new Date();
    this.pertrechoService.grabarPertrecho(this.pertrechoSelectd).subscribe( () => {
      this.complete.emit(true);
    });
  }

  cancelar() {
    this.complete.emit(true);
  }

}
