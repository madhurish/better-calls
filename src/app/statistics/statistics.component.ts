import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {InfoService} from '../info-service/info.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { database } from 'firebase';

export interface Ram {
  name: string;
  value: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  ramCollectionRef: AngularFirestoreCollection<Ram>;
  ram$: Observable<Ram[]>;

  viewbig: any[] = [1200, 200];
  viewsmall: any[] = [378, 250];
  viewpie: any[] = [400, 250];

// options for the chart
  showXAxis = false;
  showYAxis = true;
  showGridLines = false;
  gradient = false;
  showLegend = true;
  legendPos ='below';
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  timeline = true;
  
  
  data;

  hdData;

  curve = shape.curveCardinal;

  colorScheme1 = {
    domain: ['#E33C4F', '#A10A28', '#C7B42C', '#AAAAAA']

  };
  colorScheme2 = {
    domain: ['#069ADC', '#A10A28', '#C7B42C', '#AAAAAA']
    
  };
  colorScheme3 = {
    domain: ['#069ADC', '#CCCCCC', '#C7B42C', '#AAAAAA']
    
  };
  colorScheme4 = {
    domain: ['#437921', '#A10A28', '#C7B42C', '#AAAAAA']
    
  };

// line, area
  autoScale = false;

// pie
  showLabels = true;
  explodeSlices = false;
  doughnut = true;

  counter = 0;

  constructor(private service: InfoService,
              private afs: AngularFirestore,
              private router: Router) {
    this.ramCollectionRef = this.afs.collection<Ram>('data');
    this.ram$ = this.ramCollectionRef.valueChanges();
  }

  ngOnInit() {
    this.hdData = this.service.getHardDiskUsageData();
    this.ram$.subscribe((value) => {
      this.data = [{name: 'Ram', series: value}];
      this.data = [...this.data];
    });
    setInterval(() => {
      ++this.counter;
      //this.data[0].series.push({name: new Date().toISOString(), value: Math.floor(Math.random() * 99)});
      //this.data = [...this.data];
      if (this.counter < 11) {
        //this.addToDb();
      }
    }, 3000);
  }

  addToDb() {
    this.ramCollectionRef.add({name: new Date().toISOString(), value: Math.floor(Math.random() * 100)});
  }

  gotoDashboard() {
    this.router.navigate(['dashboard']);
  }
}
