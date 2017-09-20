import { SET_VISIBILITY_FILTER, visibilityFilters } from './../constants/actionTypes.js';

const visibilityFilter = (
	state = {
		filter: 'SHOW_ALL',
		tag: '',
		shown_articles: 5
	}, 
	action
) => {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return {
				...state,
				filter: action.filter,
				tag: action.tag
			};
		case visibilityFilters.SHOW_MORE:
			return {
				...state,
				shown_articles: state.shown_articles + 5
			};
		default:
			return state;
	}
}

export default visibilityFilter;