import { createStore, combineReducers } from 'redux';
import connect_form from './connect_form.js';

const rootReducer = combineReducers(
	connect_form
);


export default rootReducer;