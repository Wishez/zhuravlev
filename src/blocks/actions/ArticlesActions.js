import { FETCH_ARTICLE, FETCH_POSTS} from './../constants/actionTypes.js';

function fetchPosts(data) {
	return { 
		type: FETCH_POSTS, 
		posts: data
	}
}

function fetchArticle(data) {
	return { 
		type: FETCH_ARTICLE,
	 	article: data
	 }
}
 
export const fetchArticles = (state, action) => {
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
		default:
			return state;
	}	
}
