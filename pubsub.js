export default class pubsub {
  constructor() {
    this.events = {}; // AddItem:[handleAddItem]
  }

  subscribe(eventName, callback) {
    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  publish(eventName, data) {
    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].forEach(callback => callback(data));
  }
}
