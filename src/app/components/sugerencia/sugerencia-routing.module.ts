import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SugerenciaSolucitudComponent } from './public/sugerencia-solucitud/sugerencia-solucitud.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'solicitud', component: SugerenciaSolucitudComponent,        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SugerenciaRoutingModule { }
