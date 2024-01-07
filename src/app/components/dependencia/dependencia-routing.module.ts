import { Routes } from '@angular/router';
import { DistritosComponent } from './distritos/distritos.component';
import { CircuitosComponent } from './circuitos/circuitos.component';
import { SubcircuitosComponent } from './subcircuitos/subcircuitos.component';
import { DistritoNuevoComponent } from './distritos/distrito-nuevo/distrito-nuevo.component';
import { CircuitoNuevoComponent } from './circuitos/circuito-nuevo/circuito-nuevo.component';
import { SubcircuitoNuevoComponent } from './subcircuitos/subcircuito-nuevo/subcircuito-nuevo.component';

export const DependenciasRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'distritos', component: DistritosComponent,
        data: {
          title: 'Gestion Distritos',
          urls: [
            { title: 'Distritos', url: '/dependencia/distritos' },
            { title: 'Distritos' }
          ]
        }/*,
        children: [ 
          {
            path: 'nuevo', component: DistritoNuevoComponent,
            data: {
              title: 'Nuevo Distritos',
              urls: [
                { title: 'Distritos', url: '/dependencia/distritos' },
                { title: 'Distritos' }
              ]
            }
          }
        ]*/
      },
      {
        path: 'circuitos', component: CircuitosComponent,
        data: {
          title: 'Gestion Circuitos',
          urls: [
            { title: 'Circuitos', url: '/dependencia/circuitos' },
            { title: 'Nueva Dependencia' }
          ]
        }
      },
      {
        path: 'subcircuitos', component: SubcircuitosComponent,
        data: {
          title: 'Gestion Subcircuitos',
          urls: [
            { title: 'Subcircuitos', url: '/dependencia/subcircuitos' },
            { title: 'Nueva Dependencia' }
          ]
        }
      },
      {
        path: 'distritos/nuevo', component: DistritoNuevoComponent,
        data: {
          title: 'Nuevo Distrito',
          urls: [
            { title: 'Distrito', url: '/dependencia/distritos' },
            { title: 'Distrito' }
          ]
        }
      },
      {
        path: 'circuitos/nuevo', component: CircuitoNuevoComponent,
        data: {
          title: 'Nuevo Circuito',
          urls: [
            { title: 'Circuito', url: '/dependencia/circuitos' },
            { title: 'Circuito' }
          ]
        }
      },
      {
        path: 'subcircuitos/nuevo', component: SubcircuitoNuevoComponent,
        data: {
          title: 'Nuevo Subircuito',
          urls: [
            { title: 'Subcircuito', url: '/dependencia/subcircuitos' },
            { title: 'Subcircuito' }
          ]
        }
      }
    ]
  }
];