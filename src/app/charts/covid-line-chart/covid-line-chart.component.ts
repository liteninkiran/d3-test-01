import { Component, OnInit, OnChanges, Input, ElementRef, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-covid-line-chart',
    templateUrl: './covid-line-chart.component.html',
    styleUrls: ['./covid-line-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CovidLineChartComponent implements OnInit, OnChanges {

    @Input() public data: any;

    // Main elements
    public host: any;
    public svg: any;

    // Dimensions
    public dimensions: DOMRect;
    public innerWidth: number;
    public innerHeight: number;
    public margins = {
        left: 50,
        top: 40,
        right: 20,
        bottom: 80,
    };

    // Containers
    public dataContainer: any;
    public xAxisContainer: any;
    public yAxisContainer: any;
    public legendContainer: any;
    public title: any;

    // Scales
    public x: d3.ScaleTime<number, number>;
    public y: d3.ScaleLinear<number, number>;
    public colours: d3.ScaleOrdinal<string, unknown>;

    // Selected Data
    public selected = ['hospitalized', 'death', 'hospitalizedCurrently'];
    public active = [true, true, true];

    // Axes
    public xAxis: d3.Axis<Date | d3.NumberValue>;
    public yAxis: d3.Axis<any>;

    // Line generator
    public line: any;

    // Time formatters
    public timeParse = d3.timeParse('%Y%m%d');
    public niceData = d3.timeFormat('%B %Y');

    // Getters
    get lineData() {
        return this.selected
            .filter((d, i) => this.active[i])
            .map((item) => ({
                name: item,
                data: this.data.map((d) => ({
                    x: this.timeParse(d.date),
                    y: d[item],
                })).sort((a, b) => a.x < b.x ? -1 : 1),
            }));
    }

    constructor(element: ElementRef) {
        this.host = d3.select(element.nativeElement);
    }

    public ngOnInit(): void {
        this.svg = this.host.select('svg');
        this.setDimensions();
        this.setElements();
        this.updateChart();
        console.log(this);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.svg) {
            this.updateChart();
        }
    }

    private updateChart(): void {
        if (this.data) {
            this.setParams();
            this.setLabels();
            this.setAxis();
            this.setLegend();
            this.draw();
        }
    }

    private setDimensions(): void {
        this.dimensions = this.svg.node().getBoundingClientRect();
        this.innerWidth = this.dimensions.width - this.margins.left - this.margins.right;
        this.innerHeight = this.dimensions.height - this.margins.top - this.margins.bottom;
        this.svg.attr('viewBox', [0, 0, this.dimensions.width, this.dimensions.height]);
    }

    private setElements(): void {
        const translations = this.getTranslations();

        this.xAxisContainer = this.svg
            .append('g')
            .attr('class', 'x-axis-container')
            .attr('transform', translations.xAxis);

        this.yAxisContainer = this.svg
            .append('g')
            .attr('class', 'y-axis-container')
            .attr('transform', translations.yAxis);

        this.title = this.svg
            .append('g')
            .attr('class', 'title-container')
            .attr('transform', translations.title)
            .append('text')
            .attr('class', 'title')
            .style('text-anchor', 'middle');

        this.dataContainer = this.svg
            .append('g')
            .attr('class', 'data-container')
            .attr('transform', translations.data);

        this.legendContainer = this.svg
            .append('g')
            .attr('class', 'legend-container')
            .attr('transform', translations.legend);
    }

    private setParams(): void {
        // Temporary solution
        const parsedDates = this.data.map((d: any) => this.timeParse(d.date));

        console.log(this.lineData);

        // Set domains (min/max dates, min/max values, colours)
        const xDomain = d3.extent(parsedDates).map(d => Date.parse(d));
        const yDomain = [0, 100];
        const colourDomain = ['A', 'B', 'C'];

        // Set ranges
        const xRange = [0, this.innerWidth];
        const yRange = [this.innerHeight, 0];
        const colourRange = d3.schemeCategory10;

        // Set scales
        this.x = d3.scaleTime()
            .domain(xDomain)
            .range(xRange);

        this.y = d3.scaleLinear()
            .domain(yDomain)
            .range(yRange);

        this.colours = d3
            .scaleOrdinal()
            .domain(colourDomain)
            .range(colourRange);
    }

    private setLabels(): void {

    }

    private setAxis(): void {

    }

    private setLegend(): void {

    }

    private draw(): void {

    }

    private getTranslations(): any {
        return {
            xAxis : `translate(${this.margins.left}, ${this.margins.top + this.innerHeight})`,
            yAxis : `translate(${this.margins.left}, ${this.margins.top})`,
            title : `translate(${this.margins.left + 0.5 * this.innerWidth}, ${0.5 * this.margins.top})`,
            data  : `translate(${this.margins.left}, ${this.margins.top})`,
            legend: `translate(${this.margins.left}, ${this.dimensions.height - 0.5 * this.margins.bottom + 10})`,
        };
    }
}
