const { authByPayload } = require('../../utils');
const { Task, validateTask, validTaskPosition, validateTaskEdit } = require('../../models/task');

const terminateResponse = {
  terminate: true
};

module.exports = {
  all: async (payload) => {
    const authResponse = await authByPayload(payload);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    try {
      const allTask = await Task.find().populate('user', ['_id', 'name']);
      return {
        response: JSON.stringify({
          type: 'task_all',
          payload: allTask
        })
      };
    } catch (e) {
      return terminateResponse;
    }
  },
  add: async (payload) => {
    const authResponse = await authByPayload(payload);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    try {
      await validateTask(payload);
    } catch (e) {
      console.log('validate errror');
      console.log(e.message);
      return terminateResponse;
    }
    try {
      const savedTask = await Task.create({
        title: payload.title,
        description: payload.description || '',
        position: 'TODO',
        timestamp: payload.timestamp
      });
      return {
        response: JSON.stringify({
          type: 'task_add-confirmation',
          payload: {
            task: savedTask
          }
        }),
        broadcast: JSON.stringify({
          type: 'task_add',
          payload: {
            task: savedTask
          }
        }) };
    } catch (e) {
      console.log('unknonw errror');
      console.log(e.message);
      return terminateResponse;
    }
  },
  move: async (payload) => {
    const authResponse = await authByPayload(payload);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    if (!validTaskPosition(payload.position)) {
      return terminateResponse;
    }
    try {
      const selectedTask = await Task.findById(payload.id);
      if ((selectedTask.position === 'TODO') || (selectedTask.user._id.equals(authResponse.message))) {
        selectedTask.position = payload.position;
        if (payload.position !== 'TODO') {
          selectedTask.user = authResponse.message;
        } else {
          delete selectedTask.user;
        }
        try {
          await selectedTask.save();
          try {
            const updatedTask = await Task.findById(payload.id).populate('user', ['_id', 'name']);
            return {
              response: JSON.stringify({
                type: 'task_move-confirmation',
                payload: {
                  task: updatedTask
                }
              }),
              broadcast: JSON.stringify({
                type: 'task_move',
                payload: {
                  task: updatedTask
                }
              })
            };
          } catch (e) {
            return terminateResponse;
          }
        } catch (e) {
          return terminateResponse;
        }
      } else {
        console.log('hi');
        return terminateResponse;
      }
    } catch (e) {
      return terminateResponse;
    }
  },
  delete: async (payload) => {
    const authResponse = await authByPayload(payload);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    try {
      const deletedTask = await Task.findByIdAndDelete(payload.id);
      if (deletedTask.deletedCount !== 0) {
        return {
          response: JSON.stringify({
            type: 'task_delete-confirmation',
            payload: {
              task: deletedTask
            }
          }),
          broadcast: JSON.stringify({
            type: 'task_delete',
            payload: {
              task: deletedTask
            }
          })
        };
      }
      return terminateResponse;
    } catch (e) {
      return terminateResponse;
    }
  },
  edit: async (payload) => {
    const authResponse = await authByPayload(payload);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    try {
      const dataToValidate = {
        title: payload.title,
        description: payload.description
      };
      await validateTaskEdit(dataToValidate);
      try {
        const selectedTask = await Task.findById(payload.id);
        selectedTask.title = payload.title || selectedTask.title;
        selectedTask.description = payload.description || selectedTask.description;
        await selectedTask.save();
        const editedTask = await Task.findById(payload.id).populate('user', ['_id', 'name']);
        return {
          response: JSON.stringify({
            type: 'task_edit-confirmation',
            payload: {
              task: editedTask
            }
          }),
          broadcast: JSON.stringify({
            type: 'task_edit',
            payload: {
              task: editedTask
            }
          })
        };
      } catch (e) {
        console.log(e.message);
        return terminateResponse;
      }
    } catch (e) {
      console.log(e.message);
      return terminateResponse;
    }
  }
};
