import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyD3Component } from './my-d3/my-d3.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';
import { MyScatterChartComponent } from './my-scatter-chart/my-scatter-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MyD3Component,
    MyPieChartComponent,
    MyScatterChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
