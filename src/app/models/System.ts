export class System {
  cpu: string;
  numberOfCore: number;
  os: string;
  serial: number;
  totalStorage: number;
  usedStorage: number;
  username: string;
  uuid: string;
  ip: string;


  constructor(cpu: string, numberOfCore: number, os: string, serial: number, totalStorage: number,
              usedStorage: number, username: string, uuid: string, ip: string) {
    this.cpu = cpu;
    this.numberOfCore = numberOfCore;
    this.os = os;
    this.serial = serial;
    this.totalStorage = totalStorage;
    this.usedStorage = usedStorage;
    this.username = username;
    this.uuid = uuid;
    this.ip = ip;
  }
}
