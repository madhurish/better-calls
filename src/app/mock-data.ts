export class System {
  hostName: string;
  ip: string;

  constructor(hostName: string, ip: string) {
    this.hostName = hostName;
    this.ip = ip;
  }
}

export class MockData {
  static connectedClients: System[] = [
    new System('Jenny\'s MacBook Air', '192.168.0.12'),
    new System('John\'s MacBook Cloud', '192.168.0.13'),
    new System('Smith\'s MacBook iMac', '192.168.0.14'),
    new System('Neo\'s MacBook', '192.168.0.15'),
    new System('Brian\'s MacBook Mini', '192.168.0.16'),
    new System('Maurice\'s MacBook Pro', '192.168.0.17'),
  ];
}


