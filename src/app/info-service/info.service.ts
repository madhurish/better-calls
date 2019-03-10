import {Injectable} from '@angular/core';
import {MockData, System} from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() {
  }

  getConnectedClients(): System[] {
    return MockData.connectedClients;
  }
}
