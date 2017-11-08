import { 
	SET_VISIBILITY_FILTER,
	FETCH_POSTS,
	FETCH_ARTICLE,
	FETCH_TAGS,
	FETCH_ARCHIVE
} from '../constants/actionTypes.js';
import { setData } from '../constants/localStorage.js';

const initState = {};


const articles = (state = initState, action) => {
	switch(action.type) {
		case FETCH_POSTS:
			setData('posts', action.posts);
			return state;
		case FETCH_ARTICLE:
			setData('article', action.article);
			return state;
		case FETCH_TAGS:
			setData('tags', action.tags);
			return state;
		case FETCH_ARCHIVE:
			setData('archive', action.archive);
			return state;
		default:
			return state;
	}
}

export default articles;