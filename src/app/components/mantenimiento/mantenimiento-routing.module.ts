import { Routes } from "@angular/router";
import { SolicitudComponent } from "./solicitud/solicitud.component";
import { AuthGuard } from "../../services/security/auth.guard";
import { RecepcionComponent } from "./recepcion/recepcion.component";
import { OrdenTrabajoComponent } from "./orden-trabajo/orden-trabajo.component";

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
      },
      {
        path: 'recepcion', component: RecepcionComponent,
        data: {
          title: 'Recepci\u00F3n Mantenimiento Vehicular',
          urls: [
            { title: 'Recepcion', url: '/mantenimiento/recepcion' },
            { title: 'Recepcion' }
          ]
        }, canActivate: [AuthGuard],
      },      
      {
        path: 'registro', component: RecepcionComponent,
        data: {
          title: 'Registro Mantenimiento Vehicular',
          urls: [
            { title: 'Registro', url: '/mantenimiento/registro' },
            { title: 'Registro' }
          ]
        }, canActivate: [AuthGuard],
      },
      {
        path: 'ordenes', component: OrdenTrabajoComponent,
        data: {
          title: 'Ordenes de Trabajo',
          urls: [
            { title: 'Ordenes', url: '/mantenimiento/ordenes' },
            { title: 'Ordenes' }
          ]
        }, canActivate: [AuthGuard],
      }
    ]
  }
];