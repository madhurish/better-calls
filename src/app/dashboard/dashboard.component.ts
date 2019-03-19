import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {System} from '../models/System';
import {Observable} from 'rxjs';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import { MatDialogConfig } from '@angular/material';


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
  constructor(private afs: AngularFirestore, public dialog: MatDialog) {
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
      if (value.status) {
        this.prioritisedSystems.push(value);
      }
    });
  }

  openDialog(username: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      purpose:"HardDisk",
      description:'HardDisk running low for User:' + username
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
  }

  calculateAlerts() {
    this.connectedSystems.forEach((value) => {
      // hard disk usage alert
     if (value.hardDiskRunningLow()) {
       this.alertsCount++;
       this.openDialog(value.username);
      }
    });
  }
}

