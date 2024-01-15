import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteSugerenciaComponent } from './reporte-sugerencia/reporte-sugerencia.component';
import { AuthGuard } from '../../services/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sugerencias', component: ReporteSugerenciaComponent,
        data: {
          title: 'Sugerencia/Reclamos',
          urls: [
            { title: 'Sugerencia/Reclamos', url: '/reportes/sugerencias' },
            { title: 'Sugerencia/Reclamos' }
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
export class ReportesRoutingModule { }
