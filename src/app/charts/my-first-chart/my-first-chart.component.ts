import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-my-first-chart',
    templateUrl: './my-first-chart.component.html',
    styleUrls: ['./my-first-chart.component.scss'],
})
export class MyFirstChartComponent implements OnInit {

    public data = [125, 100, 50, 75, 200];

    constructor() {

    }

    public ngOnInit(): void {

    }

}
