import { EventEmitter } from 'events';
import store from '../store/store';
import {editTask, moveTask, setInitialTasks, addTask, deleteTask} from '../store/tasks/actions';

class Task extends EventEmitter {
  restart = () => {
      this.requestGetAllTasks();
    //   this.requestAddTask('agata', 'EBE');
    // this.requestMoveTask('5e049eb971be5b0598078759', 'TODO');
  }

  incomingMessage = (type, payload) => {
      switch(type){
        case 'task_edit': {
          this.editTaskInStore(payload);
          break;
        }
        case 'task_edit-confirmation': {
          this.editTaskInStore(payload);
          break;
        }
        case 'task_all': {
            this.saveAllTasks(payload);
            break;
        }
        case 'task_add-confirmation': {
            this.addTaskToStore(payload);
            break;
        }
        case 'task_add': {
          this.addTaskToStore(payload);
          break;
        }
        case 'task_move-confirmation': {
            this.moveTaskInStore(payload);
            break;
        }
        case 'task_move': {
          this.moveTaskInStore(payload);
          break;
        }
        case 'task_delete-confirmation': {
          this.deleteTaskInStore(payload);
          break;
        }
        case 'task_delete': {
          this.deleteTaskInStore(payload);
          break;
        }
        default:{
            console.log('task unknown type:' + type);
        }
      }
  }

  serializeTask = (payload) => {
      return {
        id: payload.task._id,
        title: payload.task.title,
        description: payload.task.description,
        position: payload.task.position,
        date: payload.task.timestamp,
        owned: this.isTaskBelongsToUser(payload.task)
      };
  }

  serializeTasks = (payload) => {
    if(payload.length === 0){
        return null;
    }
    let serializedTasks = [];
    payload.forEach(task => {
        serializedTasks.push({
            id: task._id,
            title: task.title,
            description: task.description,
            position: task.position,
            date: task.timestamp,
            owned: this.isTaskBelongsToUser(task)
        })
    });
    return serializedTasks;
  }

  saveAllTasks = (payload) => {
    console.log(payload);
    const serializedTasks = this.serializeTasks(payload);
    if(serializedTasks !== null) {
      store.dispatch(setInitialTasks(serializedTasks)); 
    }
  }

  addTaskToStore = (payload) => {
      const serializedTask = this.serializeTask(payload);
      store.dispatch(addTask(serializedTask));
  }

  editTaskInStore = (payload) => {
    console.log('wow test');
    console.log(payload);
    const serializedTask = this.serializeTask(payload);
    store.dispatch(editTask(serializedTask));

  }

  moveTaskInStore = (payload) => {
    const serializedTask = this.serializeTask(payload);
    console.log('Task to move: ');
    console.log(serializedTask);
    store.dispatch(moveTask(serializedTask));
  }

  deleteTaskInStore = (payload) => {
    const serializedTask = this.serializeTask(payload);
    store.dispatch(deleteTask(serializedTask));
  }

  requestEditTask = (task) => {
    this.emitMessage(JSON.stringify({
        type: 'task_edit',
        payload: {
            token: store.getState().user.token,
            id: task.id,
            title: task.title,
            description: task.description
        }
    }));
  }

  requestAddTask = (title, description) => {
    this.emitMessage(JSON.stringify({
        type: 'task_add',
        payload: {
            token: store.getState().user.token,
            title: title,
            description: description,
            timestamp: Date.now()
        }
    }));
  }

  requestGetAllTasks = () => {
    this.emitMessage(JSON.stringify({
        type: 'task_all',
        payload: {
            token: store.getState().user.token
        }
    }));
  }

  requestMoveTask = (taskId, position) => {
    this.emitMessage(JSON.stringify({
        type: 'task_move',
        payload: {
            token: store.getState().user.token,
            id: taskId,
            position: position
        }
    }));
  }

  requestDeleteTask = (taskId) => {
    this.emitMessage(JSON.stringify({
      type: 'task_delete',
      payload: {
        token: store.getState().user.token,
        id: taskId
      }
    }));
  }

  emitMessage = (message) => {
      console.log(message);
    this.emit('message', message);
  }

  isTaskBelongsToUser = (task) => {
    const storeState = store.getState();
    if(task.hasOwnProperty('user')){
      if(task.user._id === storeState.user.id){
         return true;
      }
      return false;
    } else {
      return true;
    }
  }
}

export default Task;
