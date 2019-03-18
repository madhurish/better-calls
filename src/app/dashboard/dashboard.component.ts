import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {System} from '../models/System';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  connectedSystems: System[];
  alertsCount: number;
  prioritisedSystems: System[];

  connectedSystemsRef: AngularFirestoreCollection<System>;
  connectedSystems$: Observable<System[]>;

  constructor(private afs: AngularFirestore) {
    this.connectedSystemsRef = this.afs.collection<System>('device_details');
    this.connectedSystems$ = this.connectedSystemsRef.valueChanges();
  }

  ngOnInit() {
    this.connectedSystems$.subscribe((value) => {
      this.connectedSystems = value;
      this.calculateClientsPrioritised();
      this.calculateAlerts();
    });
  }

  calculateClientsPrioritised() {
    this.prioritisedSystems = [];
    this.connectedSystems.forEach(value => {
      if (value.onBusinessCall) {
        this.prioritisedSystems.push(value);
      }
    });
  }

  calculateAlerts() {
    this.connectedSystems.forEach((value) => {
      // hard disk usage alert
     // if (value.hardDiskRunningLow()) {
       // this.alertsCount++;
     // }
    });
  }
}
