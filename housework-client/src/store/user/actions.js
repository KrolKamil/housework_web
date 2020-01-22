import api from '../../api';
import jwt from 'jsonwebtoken';

export const USER_REQUEST_LOGIN = 'USER_REQUEST_LOGIN';
export const USER_REQUEST_LOGIN_SUCCESS = 'USER_REQUEST_LOGIN_SUCCESS';
export const USER_REQUEST_LOGIN_ERROR = 'USER_REQUEST_LOGIN_ERROR';
export const USER_REQUEST_REGISTER = 'USER_REQUEST_REGISTER';
export const USER_REQUEST_REGISTER_SUCCESS = 'USER_REQUEST_REGISTER_SUCCESS';
export const USER_REQUEST_REGISTER_ERROR = 'USER_REQUEST_REGISTER_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';

export const logout = () => {
  return async (dispatch) => {
    window.sessionStorage.removeItem('token');
    dispatch({ type: USER_LOGOUT });
  };
};

export const login = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_LOGIN });
    try {
      const response = await api.login(login, password);
      window.sessionStorage.setItem('token', response.data.token);
      const auth = {
        token: response.data.token,
        id: jwt.decode(response.data.token).id
      };
      dispatch({ type: USER_REQUEST_LOGIN_SUCCESS, auth: auth });
    } catch (exceptation) {
      dispatch({ type: USER_REQUEST_LOGIN_ERROR, error: exceptation.response.data.message });
    }
  };
};

export const register = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_REGISTER });
    try {
      const response = await api.register(login, password);
      window.sessionStorage.setItem('token', response.data.token);
      const auth = {
        token: response.data.token,
        id: jwt.decode(response.data.token).id
      };
      dispatch({ type: USER_REQUEST_REGISTER_SUCCESS, auth: auth });
    } catch (exceptation) {
      dispatch({ type: USER_REQUEST_REGISTER_ERROR, error: exceptation.response.data.message });
    }
  };
};
