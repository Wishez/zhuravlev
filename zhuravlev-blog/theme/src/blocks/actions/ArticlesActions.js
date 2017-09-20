import { FETCH_ARTICLE, FETCH_POSTS,  FETCH_TAGS } from './../constants/actionTypes.js';
import React from 'react'; 

const fetchPosts = data => ({ 
		type: FETCH_POSTS, 
		posts: data
});

const fetchArticle = data => ({ 
	type: FETCH_ARTICLE,
 	article: data
});
 
const fetchTags = data => ({
	type: FETCH_TAGS,
	tags: data
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
		default:
			return state;
	};	
};