import {Component, OnInit} from '@angular/core';
import {InfoService} from '../info-service/info.service';
import {System} from '../mock-data';

@Component({
  selector: 'app-connected-clients',
  templateUrl: './connected-system.component.html',
  styleUrls: ['./connected-system.component.css']
})
export class ConnectedSystemComponent implements OnInit {

  connectedSystems: System[];

  constructor(private service: InfoService) {
  }

  ngOnInit() {
    this.connectedSystems = this.service.getConnectedClients();
  }

}
