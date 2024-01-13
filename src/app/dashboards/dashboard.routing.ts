import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { AuthGuard } from '../services/security/auth.guard';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard1',
        component: Dashboard1Component, canActivate: [AuthGuard],
        data: {
          title: 'Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dashboard' }
          ]
        }
      },
    ]
  }
];
