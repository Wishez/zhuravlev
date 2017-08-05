import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import visibilityFilter from './visibilityFilter.js';
import articles from './articles.js';

const rootReducer = combineReducers({
	form: formReducer,
	articles,
	visibilityFilter
});


export default rootReducer;