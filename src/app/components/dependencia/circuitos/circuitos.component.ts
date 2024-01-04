import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-circuitos',
  templateUrl: './circuitos.component.html'
})
export class CircuitosComponent {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;

}
