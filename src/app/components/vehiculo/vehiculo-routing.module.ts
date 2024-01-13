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
          title: 'Gestion Vehicular',
          urls: [
            { title: 'Vehiculo', url: '/vehiculo/vehiculos' },
            { title: 'Vehiculos' }
          ]
        }, canActivate: [AuthGuard],
      },
      {
        path: 'nuevo-vehiculo', component: VehiculosNuevoComponent,
        data: {
          title: 'Gestion Vehicular',
          urls: [
            { title: 'Vehiculo', url: '/vehiculo/vehiculos' },
            { title: 'Nuevo Vehiculo' }
          ]
        }, canActivate: [AuthGuard],
      }
    ]
  }
];

