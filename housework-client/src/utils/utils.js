import jwt from 'jsonwebtoken';
import store from '../store/store';

export const getTokenFromStorage = () => {
  try {
    return window.sessionStorage.getItem('token');
  } catch (e) {
    return null;
  }
};

export const getTrokenFromStorageAndTransformToId = () => {
  try {
    const token = window.sessionStorage.getItem('token');
    if (token === null) {
      return null;
    }
    const decodedToken = jwt.decode(token);
    return decodedToken.id;
  } catch (e) {
    return null;
  }
};

export const getTaskToEditFromStore = () => {
  const storeState = store.getState();
  if (storeState.tasks.editId !== null) {
    const foundedTask = storeState.tasks.tasks.find((task) => {
      return task.id === storeState.tasks.editId;
    });
    if (foundedTask !== undefined) {
      return foundedTask;
    }
  }
  return null;
};
