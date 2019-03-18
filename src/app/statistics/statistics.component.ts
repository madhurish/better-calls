import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {InfoService} from '../info-service/info.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {System} from '../models/System';

export interface Values {
  name: string;
  value: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  viewBig: any[] = [1200, 200];
  viewSmall: any[] = [378, 250];
  viewPie: any[] = [400, 250];

  // options for the chart
  showXAxis = false;
  showYAxis = true;
  showGridLines = false;
  gradient = false;
  showLegend = false;
  legendPos = 'below';
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  timeline = true;

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
  curve = shape.curveCardinal;

  data;
  username;
  cpuUsageData;
  ramUsageData;
  networkUsageData;
  hdData;
  systemCollectionRef: AngularFirestoreCollection<System>;

  realTimeDataRef: AngularFirestoreCollection<Values>;
  realTimeDate$: Observable<Values[]>;

  hdData$: Observable<System[]>;
  ramCollectionRef: AngularFirestoreCollection<Values>;
  ram$: Observable<Values[]>;

  constructor(private service: InfoService,
              private afs: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute) {
    this.ramCollectionRef = this.afs.collection<Values>('data');
    this.systemCollectionRef = this.afs.collection<System>('device_details');

    this.hdData$ = this.systemCollectionRef.valueChanges();
    this.ram$ = this.ramCollectionRef.valueChanges();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramsMap => {
      const id = paramsMap.get('id');
      this.getHardDiskData(id);
      this.getCpuUsage(id);
      this.getRamUsage(id);
      // this.getNetworkUsage(id);
      this.makeTheGraphMoveIt();
    });

  }

  getHardDiskData(id: string) {
    this.hdData$.subscribe(value => {
      value.forEach(system => {
        if (id === system.serial) {
          this.username = system.username;
          this.hdData = [{
            name: 'Used',
            value: system.usedStorage
          },
            {
              name: 'Total',
              value: system.totalStorage
            }];
        }
      });
    });
  }

  getCpuUsage(id: string) {
    this.realTimeDataRef = this.afs.collection<Values>(`realtime_details/${id}/cpu`);
    this.realTimeDate$ = this.realTimeDataRef.valueChanges();
    this.realTimeDate$.subscribe(data => {
      this.cpuUsageData = [{name: 'CPU Usage', series: data}];
      this.data = [{name: 'Network Usage', series: data}];
    });
  }

  getRamUsage(id: string) {
    this.realTimeDataRef = this.afs.collection<Values>(`realtime_details/${id}/memory`);
    this.realTimeDate$ = this.realTimeDataRef.valueChanges();
    this.realTimeDate$.subscribe(data => {
      this.ramUsageData = [{name: 'RAM Usage', series: data}];
    });
  }

  getNetworkUsage(id: string) {
    this.realTimeDataRef = this.afs.collection<Values>(`realtime_details/${id}/network`);
    this.realTimeDate$ = this.realTimeDataRef.valueChanges();
    this.realTimeDate$.subscribe(data => {
      this.networkUsageData = [{name: 'Network Usage', series: data}];
    });
  }

  gotoDashboard() {
    this.router.navigate(['dashboard']);
  }

  block(event: Event) {
    console.log('Block!', event);
  }
  unblock(event: Event) {
    console.log('Unblock!', event);
  }

  makeTheGraphMoveIt() {
    setInterval(() => {
      this.data[0].series.push(this.data[0].series.shift());
      this.cpuUsageData[0].series.push(this.cpuUsageData[0].series.shift());
      this.ramUsageData[0].series.push(this.ramUsageData[0].series.shift());

      this.data = [...this.data];
      this.cpuUsageData = [...this.cpuUsageData];
      this.ramUsageData = [...this.ramUsageData];
    }, 3000);
  }
}
