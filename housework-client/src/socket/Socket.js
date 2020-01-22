import {EventEmitter} from 'events';
import Task from './Task';
import Connection from './Connection';
import store from '../store/store';
import {
  setSocketConnectionToClosed,
  setSocketConnectionToOpen,
} from '../store/socket/actions';

class Socket extends EventEmitter {
  constructor () {
    super();
    this.connection = new Connection();
    this.task = new Task();
    this.socket = null;
  }

  start = () => {
    this.setHandlerListeners();
    this.socket = new WebSocket('wss://housework-api.herokuapp.com');
    // this.socket = new WebSocket('ws://localhost:3000');
    this.pingInterval = null;
    this.setSocketListeners();
  }

  stop = () => {
    if(this.socket !== null){
      this.socket.close();
    }
  }

  setHandlerListeners = () => {
    this.connection.on('message', this.handleMessage);
    this.task.on('message', this.handleMessage);
  }

  handleMessage = (message) => {
    this.socket.send(message);
  }

  setSocketListeners = () => {
    this.socket.addEventListener('open', this.openListener);
    this.socket.addEventListener('message', this.messageListener);
    this.socket.addEventListener('error', this.errorListener);
    this.socket.addEventListener('close', this.closeListener);
    this.socket.addEventListener('readyState', (e) => {console.log(this.socket.readyState)})
  }

  openListener = () => {
    this.connection.restart();
    this.task.restart();
    store.dispatch(setSocketConnectionToOpen());
  }

  messageListener = async (message) => {
    const parsedMessage = await JSON.parse(message.data);
    console.log("Pure message: " + parsedMessage.type);
    const rootType = this.getRootType(parsedMessage.type);
    switch(rootType){
      case 'pong': {
        this.connection.incomingMessage(parsedMessage.type);
        break;
      }
      case 'task': {
        this.task.incomingMessage(parsedMessage.type, parsedMessage.payload);
        break;
      }
      default: {
        console.log('unknown type: ' + parsedMessage);
      }
    }
  }

  closeListener = () => {
    store.dispatch(setSocketConnectionToClosed());
  }

  errorListener = () => {
    this.socket.close();
  }

  getRootType = (type) => {
    const index = type.search('_');
    if(index === -1){
      return type;
    }
    return type.substring(0, index);
  }
}

const socketObject = new Socket();
export default socketObject;
