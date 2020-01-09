import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'd3Demo';
  chartData:any[];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.generateData();
  }

  generateData() {
    this.chartData = [];
    for (let i = 0;i<(8 + Math.floor(Math.random() * 10));i++){
      this.chartData.push(
          {
            index:i,
            value:Math.floor(Math.random() * 100)
          }
          // Math.floor(Math.random() * 100)
        );
    }
  }

}
