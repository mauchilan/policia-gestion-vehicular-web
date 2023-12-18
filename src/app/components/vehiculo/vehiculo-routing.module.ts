import { Routes } from '@angular/router';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculosNuevoComponent } from './vehiculos-nuevo/vehiculos-nuevo.component';

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
        }
      },
      {
        path: 'nuevo-vehiculo', component: VehiculosNuevoComponent,
        data: {
          title: 'Gestion Vehicular',
          urls: [
            { title: 'Vehiculo', url: '/vehiculo/vehiculos' },
            { title: 'Nuevo Vehiculo' }
          ]
        }
      }
    ]
  }
];

