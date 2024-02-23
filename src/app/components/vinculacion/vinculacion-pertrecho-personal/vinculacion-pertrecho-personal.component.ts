import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PersonalService } from '../../../services/app/personal.service';
import { VinculacionPertrechoComponent } from './vinculacion-pertrecho/vinculacion-pertrecho.component';

@Component({
  selector: 'app-vinculacion-pertrecho-personal',
  templateUrl: './vinculacion-pertrecho-personal.component.html'
})
export class VinculacionPertrechoPersonalComponent implements OnInit {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;

  personal: any[] = [];

  constructor(private personalService: PersonalService) {}

  ngOnInit(): void {
    this.personalService.obtenerPersonal().subscribe(response => {
      this.personal = response;
    });
  }

  vincularPersonals(personal: any) {
    this.dynamicContent = true;
    if (this.dynamicInsert) {
      this.dynamicInsert.clear();
      let dynamicComp = this.dynamicInsert?.createComponent(VinculacionPertrechoComponent).instance;
      dynamicComp.personal = personal;
      dynamicComp?.complete.subscribe(complete => {
        if (complete) {
          this.dynamicContent = false;
        }
      });
    }
  }

  vincularPersonal(personal: any) {
    //this.personalSelected = [];
    //this.personalSelected.push(personal)
    //this.vincularPersonals();
  }

}
