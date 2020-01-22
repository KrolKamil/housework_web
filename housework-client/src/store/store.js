import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

console.log(store.getState());
store.subscribe(() => { console.log('update'); console.log(store.getState()); });

export default store;
