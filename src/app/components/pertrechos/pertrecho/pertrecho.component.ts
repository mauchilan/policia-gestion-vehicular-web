import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Pertrecho } from '../../../models/pertrecho';
import { Router } from '@angular/router';
import { PertrechoService } from '../../../services/app/pertrecho.service';
import { PertrechoEditarComponent } from './pertrecho-editar/pertrecho-editar.component';

@Component({
  selector: 'app-pertrecho',
  templateUrl: './pertrecho.component.html'
})
export class PertrechoComponent implements OnInit {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;
  
  listaPertrecho: Pertrecho[] = [];
  pageable: any = {};
  first: number = 0;
  rows: number = 10;
  options = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 50, value: 50 }
  ];

  constructor(private router: Router,
    private pertrechoService: PertrechoService) {}

  ngOnInit(): void {
    this.pageable.pageable = {};
    this.pageable.pageable.pageNumber = 0;
    this.buscarPertrecho(0,10);
  }

  onPageChangeDrop(event: any) {
    this.buscarPertrecho(this.first, this.rows);    
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.buscarPertrecho(event.page, this.pageable.size);
  }

  openNuevoPertrecho() {
    this.router.navigate(['/pertrechos/nuevo-pertrecho']);
  }

  buscarPertrecho(page: number, size: number) {
    this.pertrechoService.buscarPertrecho(page, size).subscribe(response => {
      this.pageable = response;
      this.listaPertrecho = response.content;
    });
  }

  openEditPertrecho(tipo: string, pertrecho: Pertrecho) {
    this.dynamicContent = true;
    if (this.dynamicInsert) {
      this.dynamicInsert.clear();
      let dynamicComp = this.dynamicInsert?.createComponent(PertrechoEditarComponent).instance;
      dynamicComp.pertrecho = pertrecho;
      dynamicComp.tipo = tipo;
      dynamicComp?.complete.subscribe(complete => {
        if (complete) {
          this.dynamicContent = false;
          this.ngOnInit();
        }
      });
    }
  }

}
