import { 
	SET_VISIBILITY_FILTER,
	FETCH_POSTS,
	FETCH_ARTICLE,
	FETCH_TAGS,
	FETCH_ARCHIVE
} from '../constants/actionTypes.js';

const initState = {
	posts: [],
	article: {},
	tags: [],
	archive: []
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
		case FETCH_ARCHIVE:
			return {
				...state,
				archive: action.archive	
			};
		default:
			return state;
	}
}

export default articles;