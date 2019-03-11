import {Injectable} from '@angular/core';
import {MockData, System} from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  resourceUsage;

  constructor() {
    this.resourceUsage = MockData.resourceUsage;
  }

  updateResourceUsage() {
    this.resourceUsage[0].series.push({name: new Date(), value: Math.floor(Math.random() * 100)});
    this.resourceUsage = [...this.resourceUsage];
  }

  getConnectedClients(): System[] {
    return MockData.connectedClients;
  }

  getRamUsageData() {
    return this.resourceUsage;
  }

  getCpuUsageData() {
    return this.resourceUsage;
  }

  getNetworkUsageData() {
    return this.resourceUsage;
  }

  getHardDiskUsageData() {
    return [
      {
        name: 'Free',
        value: 89
      },
      {
        name: 'Used',
        value: 50
      },
    ];
  }
}
