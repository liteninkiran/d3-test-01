import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-covid-line-chart',
    templateUrl: './covid-line-chart.component.html',
    styleUrls: ['./covid-line-chart.component.scss'],
})
export class CovidLineChartComponent implements OnInit {

    @Input() public data: any;

    constructor() {}

    public ngOnInit(): void {
    }

    public onClick(): void {
        console.log(this.data);
    }

}
