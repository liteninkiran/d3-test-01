import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CovidLineChartComponent } from './charts/covid-line-chart/covid-line-chart.component';
import { MyFirstChartComponent } from './charts/my-first-chart/my-first-chart.component';

@NgModule({
    declarations: [
        AppComponent,
        CovidLineChartComponent,
        MyFirstChartComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
