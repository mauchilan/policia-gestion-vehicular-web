import { Routes } from "@angular/router";
import { VinculacionVehicularComponent } from "./vinculacion-vehicular/vinculacion-vehicular.component";
import { VinculacionPersonalComponent } from "./vinculacion-personal/vinculacion-personal.component";
import { VinculacionVehicularPersonalComponent } from "./vinculacion-vehicular-personal/vinculacion-vehicular-personal.component";

export const VinculacionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'vehicular', component: VinculacionVehicularComponent,
        data: {
          title: 'Gestion Vinculacion Vehicular',
          urls: [
            { title: 'Vinculacion Vehicular', url: '/vinculacion/vehicular' },
            { title: 'Vinculacion Vehicular' }
          ]
        }
      },
      {
        path: 'personal', component: VinculacionPersonalComponent,
        data: {
          title: 'Gestion Vinculacion Personal',
          urls: [
            { title: 'Vinculacion Personal', url: '/vinculacion/personal' },
            { title: 'Vinculacion Personal' }
          ]
        }
      },
      {
        path: 'vehicular-personal', component: VinculacionVehicularPersonalComponent,
        data: {
          title: 'Gestion Vinculacion Vehicular al Personal',
          urls: [
            { title: 'Vinculacion Personal', url: '/vinculacion/personal' },
            { title: 'Vinculacion Personal' }
          ]
        }
      }
    ]
  }
  
]
