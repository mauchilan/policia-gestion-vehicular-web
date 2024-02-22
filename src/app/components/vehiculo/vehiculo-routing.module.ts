import { Routes } from '@angular/router';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculosNuevoComponent } from './vehiculos/vehiculos-nuevo/vehiculos-nuevo.component';
import { AuthGuard } from '../../services/security/auth.guard';

export const VehiculoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'vehiculos', component: VehiculosComponent,
        data: {
          title: 'Gesti\u00F3n Vehicular',
          urls: [
            { title: 'Veh\u00EDculo', url: '/vehiculo/vehiculos' },
            { title: 'Veh\u00EDculos' }
          ]
        }, canActivate: [AuthGuard],
      },
      {
        path: 'nuevo-vehiculo', component: VehiculosNuevoComponent,
        data: {
          title: 'Gesti\u00F3n Vehicular',
          urls: [
            { title: 'Veh\u00EDculo', url: '/vehiculo/vehiculos' },
            { title: 'Nuevo Veh\u00EDculo' }
          ]
        }, canActivate: [AuthGuard],
      }
    ]
  }
];

