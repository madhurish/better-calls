export class System {
  cpu: string;
  numberOfCore: number;
  os: string;
  serial: string;
  totalStorage: number;
  usedStorage: number;
  username: string;
  uuid: string;
  ip: string;
  appRunning: string;
  status: boolean;




  constructor(cpu: string, numberOfCore: number, os: string, serial: string,
              totalStorage: number, usedStorage: number, username: string,
              uuid: string, ip: string, status: boolean, appRunning: string) {
    this.cpu = cpu;
    this.numberOfCore = numberOfCore;
    this.os = os;
    this.serial = serial;
    this.totalStorage = totalStorage;
    this.usedStorage = usedStorage;
    this.username = username;
    this.uuid = uuid;
    this.ip = ip;
    this.status = status;
    this.appRunning = appRunning;
  }

  hardDiskRunningLow(): boolean {
    return (this.usedStorage / this.totalStorage) * 100 > 80;
  }
}
