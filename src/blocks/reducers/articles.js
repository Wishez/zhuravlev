import { SET_VISIBILITY_FILTER, FETCH_POSTS, FETCH_ARTICLE} from '../constants/actionTypes.js';
import expect, { createSpy, spyOn, isSpy } from 'expect';

const initState = {
	posts: '',
	article: ''
}

const articles = (state = initState, action) => {
	switch(action.type) {
		case FETCH_POSTS:
			fetch('/api/v0/articles/')
				.then(response => response.json())
				.then(data => { state.posts = data })
				.catch(err => console.log(err));
			// console.log(state);	
			return state;
		case FETCH_ARTICLE:
			fetch(`/api/v0/articles/${action.article_id}`)
				.then(response => response.json())
				.then(data => { state.article = data })
				.catch(err => console.log(err));
			// console.log(state);
			return state;
		default:
			return state;
	}
}

// expect(
// 	articles(initState, {type: FETCH_ARTICLE, article_id: 1})
// ).toExist()

// expect(
// 	articles(initState, {type: FETCH_POSTS})
// ).toExist()

// console.log('Done!');
export default articles;