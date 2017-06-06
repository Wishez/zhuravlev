import { SET_VISIBILITY_FILTER, FETCH_POSTS, FETCH_ARTICLE} from '../constants/actionTypes.js';

const initState = {
	posts: [],
	article: {}
};

const articles = (state = initState, action) => {
	switch(action.type) {
		case FETCH_POSTS:
			return {
				...state,
				posts: action.posts
			};
		case FETCH_ARTICLE:
			return {
				...state,
				article: action.article
			};
		default:
			return state;
	}
}

export default articles;