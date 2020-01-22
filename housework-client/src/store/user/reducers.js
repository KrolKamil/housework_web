import {
  getTokenFromStorage,
  getTrokenFromStorageAndTransformToId
} from '../../utils/utils';

import {
  USER_REQUEST_LOGIN,
  USER_REQUEST_LOGIN_SUCCESS,
  USER_REQUEST_LOGIN_ERROR,
  USER_REQUEST_REGISTER,
  USER_REQUEST_REGISTER_SUCCESS,
  USER_REQUEST_REGISTER_ERROR,
  USER_LOGOUT
} from './actions';

const initState = {
  token: getTokenFromStorage(),
  id: getTrokenFromStorageAndTransformToId(),
  loginError: null,
  isLogging: false,
  isRegistering: false,
  registeringError: null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGOUT: {
      return {
        ...state,
        token: null,
        id: null
      };
    }
    case USER_REQUEST_LOGIN: {
      return {
        ...state,
        isLogging: true
      };
    }
    case USER_REQUEST_LOGIN_SUCCESS: {
      return {
        ...state,
        isLogging: false,
        token: action.auth.token,
        id: action.auth.id
      };
    }
    case USER_REQUEST_LOGIN_ERROR: {
      return {
        ...state,
        isLogging: false,
        loginError: action.error
      };
    }
    case USER_REQUEST_REGISTER: {
      return {
        ...state,
        isRegistering: true
      };
    }
    case USER_REQUEST_REGISTER_SUCCESS: {
      return {
        ...state,
        isRegistering: false,
        token: action.auth.token,
        id: action.auth.id
      };
    }
    case USER_REQUEST_REGISTER_ERROR: {
      return {
        ...state,
        isRegistering: false,
        registeringError: action.error
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
