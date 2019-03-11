import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {InfoService} from '../info-service/info.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Ram {
  date: string;
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

  data;
  hdData;

  curve = shape.curveCardinal;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

// line, area
  autoScale = true;

// pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  counter = 0;

  constructor(private service: InfoService,
              private afs: AngularFirestore) {
    this.ramCollectionRef = this.afs.collection<Ram>('data');
    this.ram$ = this.ramCollectionRef.valueChanges();
  }

  ngOnInit() {
    this.data = this.service.getRamUsageData();
    this.hdData = this.service.getHardDiskUsageData();
    this.ram$.subscribe((value) => {
      this.data[0].series.push(...value);
      this.data[0].series = [...this.data[0].series];
      console.log(this.data);
    });
    setInterval(() => {
      ++this.counter;
      if (this.counter < 10) {
        // this.addToDb();
      }
    }, 3000);
  }

  addToDb() {
    this.ramCollectionRef.add({date: new Date().toISOString(), value: Math.floor(Math.random() * 100)});
  }
}
