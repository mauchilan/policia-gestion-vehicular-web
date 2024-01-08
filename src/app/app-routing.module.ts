import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './services/security/auth.guard';

const routes: Routes = [
  {
    path: '', component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard/dashboard1', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'vehiculo',
        loadChildren: () => import('./components/vehiculo/vehiculo.module').then(m => m.VehiculoModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'dependencia',
        loadChildren: () => import('./components/dependencia/dependencia.module').then(m => m.DependenciaModule),
        canActivate: [AuthGuard],
      }
      ,
      {
        path: 'vinculacion',
        loadChildren: () => import('./components/vinculacion/vinculacion.module').then(m => m.VinculacionModule),
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
