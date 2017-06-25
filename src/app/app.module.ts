import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';

import 'hammerjs';
import 'chart.js';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetricComponent } from './metric/metric.component';

import { SatoriService } from './satori.service';
import { FeedbackService } from './feedback.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { DetailFeedbackComponent } from './detail-feedback/detail-feedback.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { FilterFeedbackComponent } from './filter-feedback/filter-feedback.component';
import { GraphComponent } from './graph/graph.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {title: 'Dashboard'}
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    data: {title: 'Feedback'},
    children: [
      {
        path: 'detail/:id',
        component: DetailFeedbackComponent,
        data: {title: 'Detail'}
      },
      {
        path: ':filter',
        component: FilterFeedbackComponent,
        data: {title: 'Filtered'}
      }
    ]
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    MetricComponent,
    FeedbackComponent,
    DetailFeedbackComponent,
    DashboardHeaderComponent,
    FilterFeedbackComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SatoriService, FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
