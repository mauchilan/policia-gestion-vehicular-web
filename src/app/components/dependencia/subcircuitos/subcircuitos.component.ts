import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DependenciaService } from '../../../services/app/dependencia.service';
import { Dependencia } from '../../../models/dependencia';

@Component({
  selector: 'app-subcircuitos',
  templateUrl: './subcircuitos.component.html'
})
export class SubcircuitosComponent {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;

  subcircuitos: Dependencia[] = [];

  constructor(private router: Router, private dependenciaService: DependenciaService) {}

  ngOnInit(): void {
    this.dependenciaService.obtenerDependencias('SUBCIRCUITO').subscribe(response => {
      this.subcircuitos = response;
    })
  }

  openEditSubcircuito(tipo: string, subcircuito: Dependencia) {

  }

  openNuevoSubcircuito() {
    this.router.navigate(['/dependencia/subcircuitos/nuevo']);
  }

}
