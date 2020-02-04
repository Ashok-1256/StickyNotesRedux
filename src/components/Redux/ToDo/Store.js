import { createStore } from 'redux';
import { toDoReducer } from './ToDoReducer';
import { applyMiddleware } from 'redux';
import  logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(toDoReducer, composeWithDevTools(applyMiddleware(logger)));