import { combineReducers } from 'redux';
import connect_form from './connect_form.js';
import visibilityFilter from './visibilityFilter.js';
import articles from './articles.js';

const rootReducer = combineReducers({
	connect_form,
	articles,
	visibilityFilter
});


export default rootReducer;