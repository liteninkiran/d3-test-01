import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-my-first-chart',
    templateUrl: './my-first-chart.component.html',
    styleUrls: ['./my-first-chart.component.scss'],
})
export class MyFirstChartComponent implements OnInit {

    public data = [125, 100, 50, 75, 200];
    public rectWidth: number;
    public max: number;

    // Main elements
    public host: any;
    public svg: any;

    // Dimensions
    public dimensions: DOMRect;
    public padding: number;
    public outerPadding: number = 20;
    public bandwidth: number;
    public bandwidthCoef: number = 0.8;

    constructor(element: ElementRef) {
        this.host = d3.select(element.nativeElement);
    }

    public ngOnInit(): void {
        this.svg = this.host.select('svg');
        this.setDimensions();
    }

    private setDimensions(): void {
        this.dimensions = this.svg.node().getBoundingClientRect();
        this.rectWidth = (this.dimensions.width - 2 * this.outerPadding) / this.data.length;
        this.max = Math.max(...this.data);
        this.bandwidth = this.bandwidthCoef * this.rectWidth;
        this.padding = (1 - this.bandwidthCoef) * this.rectWidth;
        this.svg.attr('viewBox', [0, 0, this.dimensions.width, this.dimensions.height]);
    }
}
