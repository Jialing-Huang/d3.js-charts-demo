import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-my-scatter-chart',
  templateUrl: './my-scatter-chart.component.html',
  styleUrls: ['./my-scatter-chart.component.css']
})
export class MyScatterChartComponent implements AfterViewInit {
@ViewChild('scatterChart',{static:true}) chartContainer:ElementRef;
@Input() datascatter:Array<any>;

private margin = {top: 50, bottom: 20, left: 20, right: 20};


  constructor() { }

  ngAfterViewInit() {
    this.createScatterChart();
  }

  createScatterChart() {
    //Initialize the main node
    let element = this.chartContainer.nativeElement;
    console.log(element);
    let height:number = 300;

    //Svg background
    let svg = d3.select(element)
                .append('svg')
                .attr('width', 800)
                .attr('height', 500)
                .append('g')
                .attr('class', 'scatter')
                .attr('transform', "translate(" + this.margin.left + "," + this.margin.top + ")");

    //Domain of X,Y
    let xDomain = [0,this.datascatter.length];
    let yDomain = [0,d3.max(this.datascatter,d=>d.value)];  
    
    //Scale of X,Y
    let xScale = d3.scaleLinear()
                   .domain(xDomain)
                   .range([this.margin.left,800-this.margin.right-this.margin.left]);

    let yScale = d3.scaleLinear()
                   .domain(yDomain)
                   .range([height,0]);

    //Axis of X,Y
    svg.selectAll('.axis-x')
                   .data(this.datascatter)
                   .enter()
                   .append('g')
                   .attr('class','axis-x')
                   .attr('transform',`translate(${this.margin.left-20},${300})`)
                   .call(d3.axisBottom(xScale));

    svg.selectAll('.axis-y')
                   .data(this.datascatter)
                   .enter()
                   .append('g')
                   .attr('class','axis-y')
                   .attr('transform',`translate(${this.margin.left},${0})`)
                   .call(d3.axisLeft(yScale).ticks(12));

  //Create circles
  svg.selectAll('.circles')
      .data(this.datascatter)
      .enter()
      .append('g')
      .attr('class','circles')
      .append('circle')
      .attr('cx',function(d,i) {
       return xScale(i);
      })
      .attr('cy',function(d){       
        return yScale(d.value);
      })
      .attr('r','2')
      .attr('fill','black');

  //Create path  
  //Create linepath generator
  let linePath = d3.line()
                   .x(function(d,i) {
                    return xScale(i);
                   })
                   .y(function(d){     
                    return yScale(d as any);
                  });
  
  //Create path lines
  svg.selectAll('.lines')
     .data(this.datascatter)
     .enter()
     .append('g')
     .attr('class','lines')
     .append('path')
     .attr('d',linePath(this.datascatter.map(d=>d.value)))
     .attr('stroke','black')
     .attr('fill','none');


     svg.append('g')
                  .selectAll('.lines')
                  .data(this.datascatter.map(d=>d.value))
                  .enter()
                  .append('text')                                  
                  .attr('x',function(d,i) {
                    return xScale(i);
                   })
                  .attr('y',function(d){     
                    return yScale(d as any);
                  })
                  .text(function(d){
                    return Math.round(d);                           
                  })
                  .style('fill','black');

  }

}
