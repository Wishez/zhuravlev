import { 
	FETCH_ARTICLE,
	FETCH_POSTS, 
	FETCH_TAGS, 
	FETCH_ARCHIVE 
} from './../constants/actionTypes.js';

const fetchPosts = posts => ({ 
		type: FETCH_POSTS, 
		posts
});

const fetchArticle = article => ({ 
	type: FETCH_ARTICLE,
 	article
});
 
const fetchTags = tags => ({
	type: FETCH_TAGS,
	tags
});

const fetchArchive = archive => ({
	type: FETCH_ARCHIVE,
	archive
});


export const fetchData = (state, action) => {
	switch (action.type) {
		case FETCH_POSTS:
			fetch('/api/v0/articles/')
				.then(response => response.json())
				.then(data => { 
					state.dispatch(fetchPosts(data))		
				});
			break;
		case FETCH_ARTICLE:
			fetch(`/api/v0/articles/${action.article_id}`)
				.then(response => response.json())
				.then(data => { 
					state.dispatch(fetchArticle(data));
				});
			break;
		case FETCH_TAGS:
			fetch('/api/v0/tags/')
				.then(response => response.json())
				.then(data => {
					state.dispatch(fetchTags(data));
				});
			break;
		case FETCH_ARCHIVE: 
			fetch('/api/v0/archive/')
				.then(response => response.json())
				.then(data => {
					console.log('got archive===>', data);
					state.dispatch(fetchArchive(data));
				});
			break;
		default:
			return state;
	};	
};