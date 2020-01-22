import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'http://housework-api.herokuapp.com/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://housework-api.herokuapp.com/'
  }
});

export const login = async (login, password) => {
  try {
    const req = {
      name: login,
      password: password
    };
    const response = instance.post('user/login', req);
    return response;
  } catch (exception) {
    return exception;
  }
};

export const register = async (login, password) => {
  try {
    const req = {
      name: login,
      password: password
    };
    const response = instance.post('user/register', req);
    return response;
  } catch (exception) {
    return exception;
  }
};

export default {
  login,
  register
};
