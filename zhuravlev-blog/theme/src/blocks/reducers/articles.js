import { 
	SET_VISIBILITY_FILTER,
	FETCH_POSTS,
	FETCH_ARTICLE,
	FETCH_TAGS
} from '../constants/actionTypes.js';

const initState = {
	posts: [],
	article: {},
	tags: []
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
		case FETCH_TAGS:
			return {
				...state,
				tags: action.tags
			};
		default:
			return state;
	}
}

export default articles;