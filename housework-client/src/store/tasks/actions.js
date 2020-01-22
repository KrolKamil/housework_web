export const TASKS_ADD_INIT = 'TASKS_ADD_INIT';
export const TASKS_ADD = 'TASKS_ADD';
export const TASKS_MOVE = 'TASKS_MOVE';
export const TASKS_DELETE = 'TASKS_DELETE';
export const TASKS_SET_EDIT_VISIBILITY = 'TASKS_SET_EDIT_VISIBILITY';
export const TASKS_SET_NEW_VISIBILITY = 'TASKS_SET_NEW_VISIBILITY';
export const TASKS_SET_TO_EDIT = 'TASKS_SET_TO_EDIT';
export const TASKS_EDIT = 'TASKS_EDIT';

export const editTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_EDIT, task: task });
  };
};

export const setEditVisibility = (value) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_SET_EDIT_VISIBILITY, value: value });
  };
};

export const setNewVisibility = (value) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_SET_NEW_VISIBILITY, value: value });
  };
};

export const setToEdit = (id) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_SET_TO_EDIT, id: id });
  };
};

export const setInitialTasks = (tasks) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_ADD_INIT, tasks: tasks });
  };
};

export const addTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_ADD, task: task });
  };
};

export const moveTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_MOVE, task: task });
  };
};

export const deleteTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_DELETE, task: task });
  };
};
