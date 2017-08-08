import { FETCH_ARTICLE, FETCH_POSTS, visibilityFilters, FETCH_TAGS } from './../constants/actionTypes.js';
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

const filterByTag = (
	articles, 
	tag
) => {
	const posts = articles.filter(article => {
		return article.tags.indexOf(tag) !== -1;
	});

	return posts.length ? posts : false;
};

export const filterArticles = ( 
	articles,
	action
) => {
	switch (action.filter) {
		case visibilityFilters.SHOW_SEARCH:
			const posts = articles.filter(article => {
		    	const reg = new RegExp(action.value, 'gi'),
		    		  isMatch = reg.test(article.title)  ||
		    		   			reg.test(article.announce_text);

		    	if (isMatch) {
		    		article.title = article.title
		    			.replace(reg, `<span style='background: #ffe276'>${action.value}</span>`);
		    		article.announce_text = article.announce_text
		    			.replace(reg, `<span style='background: #ffe276'>${action.value}</span>`);

    				return article;
		    	}

		    	return false;
	    	});
	    	return posts.length ? posts : false;
		case visibilityFilters.SHOW_BY_TAG:
			return filterByTag(articles, action.tag);
		default:
			return articles;
	};
};