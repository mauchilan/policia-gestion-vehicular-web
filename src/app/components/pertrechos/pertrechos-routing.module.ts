import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PertrechoComponent } from './pertrecho/pertrecho.component';
import { AuthGuard } from '../../services/security/auth.guard';
import { PertrechoNuevoComponent } from './pertrecho/pertrecho-nuevo/pertrecho-nuevo.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pertrecho', component: PertrechoComponent,
        data: {
          title: 'Gestion de Pertrechos',
          urls: [
            { title: 'Pertrechos', url: '/pertrechos/pertrecho' },
            { title: 'Pertrechos' }
          ]
        }, canActivate: [AuthGuard],
      },
      {
        path: 'nuevo-pertrecho', component: PertrechoNuevoComponent,
        data: {
          title: 'Gestion de Pertrechos',
          urls: [
            { title: 'Pertrechos', url: '/pertrechos/pertrecho' },
            { title: 'Nuevo Pertrechos' }
          ]
        }, canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PertrechosRoutingModule { }
