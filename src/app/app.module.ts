import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CovidLineChartComponent } from './charts/covid-line-chart/covid-line-chart.component';
import { MyFirstChartComponent } from './charts/my-first-chart/my-first-chart.component';
import { MySecondChartComponent } from './charts/my-second-chart/my-second-chart.component';

@NgModule({
    declarations: [
        AppComponent,
        CovidLineChartComponent,
        MyFirstChartComponent,
        MySecondChartComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
