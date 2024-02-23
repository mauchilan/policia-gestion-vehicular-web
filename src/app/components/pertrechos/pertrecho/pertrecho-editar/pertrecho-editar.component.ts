import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pertrecho } from '../../../../models/pertrecho';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CatalogoService } from '../../../../services/app/catalogo.service';
import { Catalogo } from '../../../../models/catalogo';
import { PertrechoService } from '../../../../services/app/pertrecho.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-pertrecho-editar',
  templateUrl: './pertrecho-editar.component.html',
  providers: [ConfirmationService, MessageService]
})
export class PertrechoEditarComponent implements OnInit {

  @Input() pertrecho!: Pertrecho;
  @Input() tipo!: string;
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  pertrechoForm!: UntypedFormGroup;
  accion!: string;  
  tipoArmas: Catalogo = {};
  visible: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder,
    private catalogoService: CatalogoService,
    private pertrechoService: PertrechoService,
    private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    if (this.tipo === 'editar') {
      this.accion = 'Editar'
    } else {
      this.accion = 'Eliminar';
    }
    this.pertrechoForm = this.formBuilder.group({
      codigo: new FormControl(this.pertrecho.codigo, [Validators.required]),
      nombre: new FormControl(this.pertrecho.nombre, [Validators.required]),
      descripcion: new FormControl(this.pertrecho.descripcion, [Validators.required]),
      tipoArma: new FormControl(this.pertrecho.tipoArma?.idCatalogo, [Validators.required])
    });
    this.catalogoService.obtenerCatalogo('Tipo Arma', 'A').subscribe(response => {
      this.tipoArmas = response;
    });
  }

  guardarPertrecho(event: Event) {
    this.pertrechoForm.markAllAsTouched();
    this.pertrechoForm.updateValueAndValidity();
    if (!this.pertrechoForm.valid) {
      this.showDialog();
    } else {
      this.mostrarMensaje(event);
    }
  }

  showDialog() {
    this.visible = true;
  }

  mostrarMensaje(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Desea guardar los cambios?',
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
    let pertrecho: Pertrecho = new Pertrecho;
    pertrecho.tipoArma = {}
    pertrecho.codigo = this.pertrechoForm.value.codigo;
    pertrecho.nombre = this.pertrechoForm.value.nombre;
    pertrecho.descripcion = this.pertrechoForm.value.descripcion;
    pertrecho.tipoArma!.idCatalogo = this.pertrechoForm.value.tipoArma;
    this.pertrechoService.grabarPertrecho(pertrecho).subscribe( () => {
      this.complete.emit(true);
    });
  }

  cancelar() {
    this.complete.emit(true);
  }

}
