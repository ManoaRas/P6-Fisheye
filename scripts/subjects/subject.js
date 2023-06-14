export class Subject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers.filter(obs => obs !== observer)
  }

  dispatch() {
    this.observers.forEach(observer => observer.init());
  }
}
