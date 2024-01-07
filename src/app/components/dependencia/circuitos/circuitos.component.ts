import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DependenciaService } from '../../../services/app/dependencia.service';
import { Dependencia } from '../../../models/dependencia';

@Component({
  selector: 'app-circuitos',
  templateUrl: './circuitos.component.html'
})
export class CircuitosComponent {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;

  circuitos: Dependencia[] = []

  constructor(public router: Router,
    private dependenciaService: DependenciaService) { }

  ngOnInit(): void {
    this.dependenciaService.obtenerDependencias('CIRCUITO').subscribe(response => {
      this.circuitos = response;
    })
  }

  openNuevoCircuito() {
    this.router.navigate(['/dependencia/circuitos/nuevo']);
  }

  openEditCircuito(tipo: string, distrito: Dependencia) {
    /*this.dynamicContent = true;
    if (this.dynamicInsert) {
      this.dynamicInsert.clear();
      let dynamicComp = this.dynamicInsert?.createComponent(DistritoEditarComponent).instance;
      dynamicComp.distrito = distrito;
      dynamicComp.tipo = tipo;
      dynamicComp?.complete.subscribe(complete => {
        if (complete) {
          this.dynamicContent = false;
        }
      });
    }*/
  }

}
