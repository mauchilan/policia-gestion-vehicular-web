import { Routes } from "@angular/router";
import { VinculacionVehicularComponent } from "./vinculacion-vehicular/vinculacion-vehicular.component";
import { VinculacionPersonalComponent } from "./vinculacion-personal/vinculacion-personal.component";
import { VinculacionVehicularPersonalComponent } from "./vinculacion-vehicular-personal/vinculacion-vehicular-personal.component";
import { AuthGuard } from "../../services/security/auth.guard";
import { VinculacionPertrechoPersonalComponent } from "./vinculacion-pertrecho-personal/vinculacion-pertrecho-personal.component";

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
        }, canActivate: [AuthGuard],
      },
      {
        path: 'personal', component: VinculacionPersonalComponent,
        data: {
          title: 'Gestion Vinculacion Personal',
          urls: [
            { title: 'Vinculacion Personal', url: '/vinculacion/personal' },
            { title: 'Vinculacion Personal' }
          ]
        }, canActivate: [AuthGuard],
      },
      {
        path: 'vehicular-personal', component: VinculacionVehicularPersonalComponent,
        data: {
          title: 'Gestion Vinculacion Vehicular al Personal',
          urls: [
            { title: 'Vinculacion Personal', url: '/vinculacion/personal' },
            { title: 'Vinculacion Personal' }
          ]
        }, canActivate: [AuthGuard],
      },
      {
        path: 'pertecho-personal', component: VinculacionPertrechoPersonalComponent,
        data: {
          title: 'Gestion Vinculacion Pertecho al Personal',
          urls: [
            { title: 'Vinculacion Pertecho', url: '/vinculacion/pertecho-personal' },
            { title: 'Vinculacion Pertecho' }
          ]
        }, canActivate: [AuthGuard],
      }
    ]
  }
  
]
