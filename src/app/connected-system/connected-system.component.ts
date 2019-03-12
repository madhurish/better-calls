import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {System} from '../models/System';

@Component({
  selector: 'app-connected-clients',
  templateUrl: './connected-system.component.html',
  styleUrls: ['./connected-system.component.css']
})
export class ConnectedSystemComponent implements OnInit {

  connectedSystems;

  connectedSystemsRef: AngularFirestoreCollection<System>;
  connectedSystems$: Observable<System[]>;

  constructor(private afs: AngularFirestore) {
    this.connectedSystemsRef = this.afs.collection<System>('device_details');
    this.connectedSystems$ = this.connectedSystemsRef.valueChanges();
  }

  ngOnInit() {
    this.connectedSystems$.subscribe((value) => {
      this.connectedSystems = value;
    });
  }

}
