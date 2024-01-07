import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DependenciaService } from '../../../services/app/dependencia.service';
import { Dependencia } from '../../../models/dependencia';
import { DistritoEditarComponent } from './distrito-editar/distrito-editar.component';

@Component({
  selector: 'app-distritos',
  templateUrl: './distritos.component.html'
})
export class DistritosComponent {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;
  distritos: Dependencia[] = [];

  constructor(public router: Router,
    private dependenciaService: DependenciaService) { }


  ngOnInit(): void {
    this.dependenciaService.obtenerDependencias('DISTRITO').subscribe(response => {
      this.distritos = response;
    })
  }
  
  openNuevoDistrito() {
    this.router.navigate(['/dependencia/distritos/nuevo']);
  }

  openEditDistrito(tipo: string, distrito: Dependencia) {
    this.dynamicContent = true;
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
    }
  }

}
