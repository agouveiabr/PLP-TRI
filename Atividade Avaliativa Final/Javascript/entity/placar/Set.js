export class Set {
  constructor(time1, time2) {
    this.time1 = time1;
    this.time2 = time2;
  }

  exibir() {
    return `${this.time1} x ${this.time2}`;
  }
}