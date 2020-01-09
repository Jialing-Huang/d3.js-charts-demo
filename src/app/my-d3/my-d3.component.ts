import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { scaleLinear, map } from 'd3';

@Component({
  selector: 'app-my-d3',
  templateUrl: './my-d3.component.html',
  styleUrls: ['./my-d3.component.css']
})
export class MyD3Component implements AfterViewInit {
@ViewChild('chart',{static:false}) private chartContainer:ElementRef;
@Input() dataset:Array<any>;

private margin: any = { top: 50, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  // private height: number;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  


  constructor() { }

  ngAfterViewInit() {
    console.log(this.dataset);
    this.createBarChart();
  }
  

  createBarChart() {
    let element = this.chartContainer.nativeElement;
    console.log(element);

    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.width = 800;
    let height = 300;
    let svg = d3.select(element)
                .append('svg')
                .attr('width', 800)
                .attr('height', 500)
                .append('g')
                .attr('class', 'bars')
                .attr('transform', "translate(" + this.margin.left + "," + this.margin.top + ")");

    // define X & Y domains
    let xDomain = this.dataset.map(d=>d.index);
    let yDomain = [0, d3.max(this.dataset,d=>d.value)];

    // create scales
    let xScale = d3.scaleBand()
                    .padding(0.1)
                    .domain(xDomain)
                    .rangeRound([0, this.width-this.margin.right]);
    let yScale = d3.scaleLinear()
                    .domain(yDomain)
                    .range([height,0]);

    // bar colors
    this.colors = d3.scaleLinear()
                    .domain([0, this.dataset.length]).range(<any[]>['red', 'blue']);

    //chart
    
    this.chart = svg.append('g')
                    .selectAll('rect')
                    .data(this.dataset)
                    .enter()
                    .append('rect')                    
                    .attr('x',function(d){
                      return xScale(d.index)+20;
                    })
                    .attr('width',xScale.bandwidth)
                    .attr('y',function(d){
                      return yScale(d.value);
                    })
                    .attr('height',
                          function(d){
                            return height - yScale(d.value);                           
                          }
                        )                    
                    .style('fill','steelblue')
                    .on('mouseenter',function(d,i){
                      d3.select(this).style('fill','yellow');
                    })
                    .on('mouseleave',function(d,i){
                      d3.select(this).style('fill','steelblue');
                    });

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${height})`)
      .call(d3.axisBottom(xScale));
      
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${0})`)
      .call(d3.axisLeft(yScale).ticks(20));

    svg.append('g')
                  .selectAll('rect')
                  .data(this.dataset)
                  .enter()
                  .append('text')
                  .attr('class','mytext')                  
                  .attr('x',(d)=>(xScale(d.index)+35))
                  .attr('y',(d)=>(yScale(d.value)-5))
                  .text(function(d){
                    return Math.round(d.value);                           
                  })
                  .style('fill','black');
  }
}
