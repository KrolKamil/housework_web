import {
  TASKS_ADD_INIT,
  TASKS_ADD,
  TASKS_MOVE,
  TASKS_DELETE,
  TASKS_SET_EDIT_VISIBILITY,
  TASKS_SET_NEW_VISIBILITY,
  TASKS_SET_TO_EDIT,
  TASKS_EDIT
} from './actions';

const initState = {
  tasks: [],
  editVisible: false,
  newVisible: false,
  toEdit: null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case TASKS_EDIT: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.task.id) {
            return {
              ...task,
              title: action.task.title,
              description: action.task.description,
              owned: action.task.owned
            };
          }
          return task;
        })
      };
    }
    case TASKS_SET_TO_EDIT: {
      return {
        ...state,
        toEdit: state.tasks.find((task) => {
          return task.id === action.id;
        })
      };
    }
    case TASKS_SET_NEW_VISIBILITY: {
      return {
        ...state,
        newVisible: action.value
      };
    }
    case TASKS_SET_EDIT_VISIBILITY: {
      return {
        ...state,
        editVisible: action.value
      };
    }
    case TASKS_ADD_INIT: {
      return {
        ...state,
        tasks: [
          ...action.tasks
        ]
      };
    }
    case TASKS_ADD: {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { ...action.task }
        ]
      };
    }
    case TASKS_MOVE: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.task.id) {
            return {
              ...task,
              position: action.task.position,
              owned: action.task.owned
            };
          }
          return task;
        })
      };
    }
    case TASKS_DELETE: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          if (task.id === action.task.id) {
            return false;
          }
          return true;
        })
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
