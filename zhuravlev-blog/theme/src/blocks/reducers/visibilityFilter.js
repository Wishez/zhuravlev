import { SET_VISIBILITY_FILTER } from './../constants/actionTypes.js';

const visibilityFilter = (state = {
	filter: 'SHOW_ALL',
	tag: ''
}, action) => {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return {
				filter: action.filter,
				tag: action.tag
			}
		default:
			return state;
	}
}

export default visibilityFilter;