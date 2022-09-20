import { createStore } from 'redux';
import todoApp from './reducers/reduce';

const store = createStore(todoApp);

export default store;

