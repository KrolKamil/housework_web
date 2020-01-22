export const SOCKET_SET_CONNECTION = 'SOCKET_SET_CONNECTION';

export const socketConnectionStates = {
  CONNECTING: 'CONNECTING',
  OPEN: 'OPEN',
  CLOSING: 'CLOSING',
  CLOSED: 'CLOSED'
};

export const setSocketConnectionToConnecting = () => {
  return async (dispatch) => {
    dispatch({ type: SOCKET_SET_CONNECTION, state: socketConnectionStates.CONNECTING });
  };
};

export const setSocketConnectionToOpen = () => {
  return async (dispatch) => {
    dispatch({ type: SOCKET_SET_CONNECTION, state: socketConnectionStates.OPEN });
  };
};

export const setSocketConnectionToClosing = () => {
  return async (dispatch) => {
    dispatch({ type: SOCKET_SET_CONNECTION, state: socketConnectionStates.CLOSING });
  };
};

export const setSocketConnectionToClosed = () => {
  return async (dispatch) => {
    dispatch({ type: SOCKET_SET_CONNECTION, state: socketConnectionStates.CLOSED });
  };
};
