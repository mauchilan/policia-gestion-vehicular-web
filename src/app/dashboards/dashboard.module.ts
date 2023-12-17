import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';

//import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { IncomeCounterComponent } from './dashboard-components/income-counter/income-counter.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    NgChartsModule,
    ChartistModule,
    //PerfectScrollbarModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    Dashboard1Component,
    IncomeCounterComponent
  ]
})
export class DashboardModule { }
