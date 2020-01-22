import {
  SOCKET_SET_CONNECTION
} from './actions';

const initState = {
  connectionState: null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SOCKET_SET_CONNECTION: {
      return {
        ...state,
        connectionState: action.state
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
