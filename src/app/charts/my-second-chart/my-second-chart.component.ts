import { Component, ElementRef, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-my-second-chart',
    templateUrl: './my-second-chart.component.html',
    styleUrls: ['./my-second-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MySecondChartComponent implements OnInit, OnChanges {

    public data = [125, 100, 50, 75, 200];
    public max: number = Math.max(...this.data);

    // Main elements
    public host: any;
    public svg: any;

    // Dimensions
    public dimensions: DOMRect;
    public padding: number;
    public outerPadding: number = 20;
    public bandwidth: number;
    public bandwidthCoef: number = 0.8;
    public rectWidth: number;

    constructor(element: ElementRef) {
        this.host = d3.select(element.nativeElement);
    }

    public ngOnInit(): void {
        this.svg = this.host.select('svg');
        this.setDimensions();
        this.updateChart();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!this.svg) {
            return;
        }
        this.updateChart();
    }

    private setDimensions(): void {
        this.dimensions = this.svg.node().getBoundingClientRect();
        this.rectWidth = (this.dimensions.width - 2 * this.outerPadding) / this.data.length;
        this.bandwidth = this.bandwidthCoef * this.rectWidth;
        this.padding = (1 - this.bandwidthCoef) * this.rectWidth;
        this.svg.attr('viewBox', [0, 0, this.dimensions.width, this.dimensions.height]);
    }

    private updateChart(): void {
        this.draw();
    }

    private draw(): void {
        const bars = this.svg
            .selectAll('rect')
            .data(this.data);

        bars.enter()
            .append('rect')
            .merge(bars)
            .attr('x', (d, i) => this.rectWidth * i + 0.5 * this.padding + this.outerPadding)
            .attr('y', (d, i) => this.dimensions.height - this.dimensions.height / this.max * d)
            .attr('width', this.bandwidth)
            .attr('height', (d, i) => this.dimensions.height / this.max * d);

        bars.exit().remove();
    }

}
