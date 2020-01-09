import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { arc, color } from 'd3';

@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements AfterViewInit {
@ViewChild('pieChart',{static:false}) pieContainer:ElementRef; 
@Input() datapie:Array<any>;

  constructor() { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.createPieChart();
  }

createPieChart() {
  let element = this.pieContainer.nativeElement;
  console.log(element);

  //Initialize pieData
  let radius = 150;
  //let pieData = this.dataset.map(d=>d.value);

  //Identify chart zone
  let svg = d3.select(element)
              .append('svg')
              .attr('width', 600)
              .attr('height', 500)
              .append('g')               
              .attr('class', 'pies')
              .attr('transform', `translate(${300},${250})`);

  //chart parameters initialize
 
//Map the data which would be banded
let dataPieChart =this.datapie.map(d=>d.value);

//Color relationship function
let colors = d3.scaleOrdinal()
              .domain(dataPieChart)
              .range(d3.schemeCategory10);

              console.log(color);

//Arc generator as one base of path() function
let arcGenerator = d3.arc()
             .outerRadius(radius)
             .innerRadius(0);

             console.log(arcGenerator);

let labelArc = d3.arc()
              .outerRadius(radius - 50)
              .innerRadius(radius - 50);

console.log(labelArc);

//Pie() convert data into path data, as another base of path() function
let pie = d3.pie()
            .sort(null)
            .value(function(d){
              return <number>d;
            }); 

//Band pie() and arc data to build up pie chart
let g = svg.selectAll('.arc')
             .data(pie(dataPieChart))
             .enter()
             .append('g')                         
                .attr('class','arc')
             .append('path')
             .attr('d', <any>arcGenerator)
             .attr('fill',function(d,i){
               let a = colors(<any>i);
               return a.toString();
             })
             .attr('stroke','black')
             .on('mouseenter',function(d,i){
               d3.select(this)                 
                 .attr('opacity','0.4')
             })
             .on('mouseleave',function(d,i){
              d3.select(this)
                .attr('opacity','1')
            });

      //Add text notations
       svg.selectAll('.arc')                        
              .append('g')                             
              .append('text')                            
              .attr('transform',function(d){
                 return "translate(" + labelArc.centroid(<any>d) + ")";
               })
             .attr('text-anchor','middle')
             .attr('fill','white')
             .attr('font-size',"80%")
             .text(function(d){
               let b = d as any;   //Same as <any>d
               return b.value.toString();
             });
          
  }

}
