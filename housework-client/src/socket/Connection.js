import { EventEmitter } from 'events';

class Connection extends EventEmitter {
  constructor () {
    super();
    this.pingInterval = null;
  }

  restart = () => {
    this.startPingInterval();
  }

  startPingInterval = () => {
      this.pingInterval = window.setInterval(this.ping, 10000);
  }

  ping = () => {
    this.emit('message', JSON.stringify({
        type: 'ping'
    }));
  }

  incomingMessage = (type) => {
    console.log('server ping responsed' + type);
  }
}

export default Connection;
