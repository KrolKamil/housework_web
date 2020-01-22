import { combineReducers } from 'redux';
import userReducer from './user/reducers';
import tasksReducer from './tasks/reducers';
import socketReducer from './socket/reducers';

const reducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
  socket: socketReducer
});

export default reducer;
