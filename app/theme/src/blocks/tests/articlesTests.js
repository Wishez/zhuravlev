import articles from './../reducers/articles.js';
import { visibilityFilter, FETCH_ARTICLE, FETCH_POSTS } from './../constants/actionTypes.js';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testFetchPosts = () => {
	const stateBefore = [];
	const action = {type: FETCH_POSTS};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		articles(stateBefore, action)
	).toExist()
};

const testFetchArticle = () => {
	const stateBefore = [];
	const action = {type: FETCH_ARTICLE, article_id: 1};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		articles(stateBefore, action)
	).toExist()
};
testFetchPosts();
testFetchArticle();

console.log('Articles were got!');
// export {testFetchPosts, testFetchArticle} ;