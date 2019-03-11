import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {


  year = 2011;

  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 730
        },
        {
          name: '2011',
          value: 894
        }
      ],
    },
    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 730
        },
        {
          name: '2011',
          value: 894
        }
      ]
    }
  ];

  single = [
    {
      name: 'Germany',
      value: 89
    },
    {
      name: 'USA',
      value: 50
    },
    {
      name: 'France',
      value: 72
    }
  ];


  view: any[] = [700, 400];

// options for the chart
  showXAxis = true;
  showYAxis = true;
  showGridLines = false;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

// line, area
  autoScale = true;

// pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      this.multi[0].series.push({name: this.year.toString(), value: Math.floor(Math.random() * 100 + 1)});
      this.multi[0].series.shift();
      console.log(this.multi[0].series.length);
      this.multi[1].series.push({name: this.year.toString(), value: Math.floor(Math.random() * 100 - 1)});
      this.multi[1].series.shift();
      this.year++;
      this.multi = [...this.multi];
      //this.single.push({name: 'INdia', value: 32});
      //this.single = [...this.single];
    }, 1000);
  }
}
