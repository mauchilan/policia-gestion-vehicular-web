import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-subcircuitos',
  templateUrl: './subcircuitos.component.html'
})
export class SubcircuitosComponent {

  @ViewChild('dynamicInsert', { static: true, read: ViewContainerRef })
  public dynamicInsert?: ViewContainerRef;
  dynamicContent: boolean = false;

}
