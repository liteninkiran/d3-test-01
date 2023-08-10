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
    public host: d3.Selection<any, any, any, any>;
    public svg: d3.Selection<any, any, any, any>;

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
    public legendContainer: d3.Selection<any, any, any, any>;
    public title: any;

    // Scales
    public x: d3.ScaleTime<number, number>;
    public y: d3.ScaleLinear<number, number>;
    public colours: d3.ScaleOrdinal<string, unknown>;

    // Selected Data
    public selected: Array<string> = ['hospitalized', 'death', 'hospitalizedCurrently'];
    public active = [true, true, true];

    // Axes
    public xAxis: d3.Axis<Date | d3.NumberValue>;
    public yAxis: d3.Axis<any>;

    // Line generator
    public line: d3.Line<any>;

    // Time formatters
    public timeParse = d3.timeParse('%Y%m%d');

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
        const data: Array<any> = this.lineData;
        const parsedDates: Array<Date> = this.data.map((d: any) => this.timeParse(d.date));
        const maxValues: Array<number> = data.map((series) => d3.max(series.data, (d: any) => parseInt(d.y)));

        // Set domains (min/max dates, min/max values, colours)
        const xDomain: Array<number> = d3.extent(parsedDates).map(d => Date.parse(d));
        const yDomain: any = [0, d3.max(maxValues)];
        const colourDomain: Array<string> = this.selected;

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

        this.line = d3.line()
            .x((d: any) => this.x(d.x))
            .y((d: any) => this.y(d.y));
    }

    private setLabels(): void {
        this.title.text('Covid Evolution in US');
    }

    private setAxis(): void {
        this.xAxis = d3
            .axisBottom(this.x)
            .ticks(d3.timeMonth.every(1))
            .tickFormat(d3.timeFormat('%b %Y'))
            .tickSizeOuter(0);

        this.xAxisContainer
            .transition()
            .duration(500)
            .call(this.xAxis);

        this.yAxis = d3.axisLeft(this.y)
            .ticks(5)
            .tickSizeOuter(0)
            .tickSizeInner(-this.innerWidth)
            .tickFormat(d3.format('~s'));

        this.yAxisContainer
            .transition()
            .duration(500)
            .call(this.yAxis);

        // Apply dashes to all horizontal lines except the x-axis
        this.yAxisContainer
            .selectAll('.tick:not(:nth-child(2)) line')
            .style('stroke', '#ddd')
            .style('stroke-dasharray', '2 2');
    }

    private setLegend(): void {
        const itemContainers: d3.Selection<any, any, any, any> = this.legendContainer
            .selectAll('g.legend-item')
            .data(this.selected);

        const newItems: d3.Selection<any, any, any, any> = itemContainers.enter()
            .append('g')
            .attr('class', 'legend-item')
            .each(function(d) {
                const g = d3.select(this);
                g.append('circle')
                    .attr('class', 'legend-icon')
                    .attr('cx', 3)
                    .attr('cy', -4)
                    .attr('r', 3);

                g.append('text')
                    .attr('class', 'legend-label')
                    .attr('x', 9)
                    .style('font-size', '0.8rem');
            });

        const mergedSelection: d3.Selection<any, any, any, any> = newItems.merge(itemContainers);

        mergedSelection
            .selectAll('circle.legend-icon')
            .style('fill', (d: any) =>  this.colours(d).toString());

        mergedSelection
            .selectAll('text.legend-label')
            .text((d: any) => d);

        itemContainers.exit().remove();

        // Position the Legend Items
        let totalPadding = 0;
        this.legendContainer
            .selectAll('g.legend-item')
            .each(function() {
                const g = d3.select(this);
                g.attr('transform', `translate(${totalPadding}, 0)`);
                totalPadding += (g.node() as SVGSVGElement).getBBox().width + 10;
            });

        // Centre the Legend
        const legendWidth = this.legendContainer.node().getBBox().width;
        const translations = this.getTranslations(legendWidth);
        this.legendContainer.attr('transform', translations.ctr.legend);
    }

    private draw(): void {
        // Bind data
        const lines = this.dataContainer
            .selectAll('path.data')
            .data(this.lineData, (d: any) => d.name);

        // Enter and merge
        lines.enter()
            .append('path')
            .attr('class', 'data')
            .style('fill', 'none')
            .style('stroke-width', '2px')
            .merge(lines)
            .transition()
            .duration(500)
            .attr('d', (d: any) => this.line(d.data))
            .style('stroke', (d: any) => this.colours(d.name));

        // Exit
        lines.exit().remove();
    }

    private getTranslations(legendWidth = 0): any {
        return {
            xAxis : `translate(${this.margins.left}, ${this.margins.top + this.innerHeight})`,
            yAxis : `translate(${this.margins.left}, ${this.margins.top})`,
            title : `translate(${this.margins.left + 0.5 * this.innerWidth}, ${0.5 * this.margins.top})`,
            data  : `translate(${this.margins.left}, ${this.margins.top})`,
            legend: `translate(${this.margins.left}, ${this.dimensions.height - 0.5 * this.margins.bottom + 10})`,
            ctr: {
                legend: `translate(${this.margins.left + 0.5 * (this.innerWidth - legendWidth)}, ${this.dimensions.height - 0.5 * this.margins.bottom + 10})`,
            },
        };
    }
}
