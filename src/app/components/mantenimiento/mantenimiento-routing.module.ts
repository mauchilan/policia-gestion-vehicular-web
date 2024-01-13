import { Routes } from "@angular/router";
import { SolicitudComponent } from "./solicitud/solicitud.component";
import { AuthGuard } from "../../services/security/auth.guard";

export const MantenimientoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'solicitud', component: SolicitudComponent,
        data: {
          title: 'Solicitud Mantenimiento Vehicular',
          urls: [
            { title: 'Solicitud', url: '/mantenimiento/solicitud' },
            { title: 'Solicitud' }
          ]
        }, canActivate: [AuthGuard],
      }
    ]
  }
];