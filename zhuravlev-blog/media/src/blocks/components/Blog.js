import React, { Component } from 'react';
import { render } from 'react-dom'; 
// import ListItem from './ListItem';
import configureStore from './../store/configureStore.js';
// import Title from './Title';
// import { Loader } from 'semantic-ui-react';
import { fetchArticles, filterArticles } from './../actions/ArticlesActions.js';
import { FETCH_POSTS, visibilityFilters, SET_VISIBILITY_FILTER } from './../constants/actionTypes.js';
import { Button } from 'semantic-ui-react';
import ArticlesList from './ArticlesList';


const store = configureStore();

class Blog extends Component {

	componentDidMount() {
		const { search, showSearch, loadArticles } = this.props;

		if (search) {
			showSearch();
		}
		
		loadArticles();
	}
			
	render() {
		const {
			search,
			visibilityFilter,
			showSearch
		} = this.props;

		let articles = this.props.articles;
		return (
				<section className='blog'>
					<div className='container'>
						<Button size='big' 
							content="Показать все статьи"
							onClick={() => {
								store.dispatch({
									type: SET_VISIBILITY_FILTER,
									action: visibilityFilters.SHOW_ALL,
									value: '',
									tag: ''
								})
							}}
						/>
						<ArticlesList articles={filterArticles(articles, 
							{
								filter: visibilityFilter.filter,
								value: search,
								tag: visibilityFilter.tag
							})}
							filterByTag={tag_name => {
								store.dispatch({
									type: SET_VISIBILITY_FILTER,
									filter: visibilityFilters.SHOW_BY_TAG,
									tag: tag_name
								})
							}}
						 />
					</div>
				</section>
		);
	}
}

const view = () => {
	window.props.articles = store.getState().articles.posts;
	window.props.visibilityFilter = store.getState().visibilityFilter;
	window.props.loadArticles = () => { 
		fetchArticles(
			store,
			{ type: FETCH_POSTS }
		);
	};
	window.props.showSearch = () => {
		store.dispatch({
			type: SET_VISIBILITY_FILTER,
			filter: visibilityFilters.SHOW_SEARCH,
			tag: ''	
		});
	};
	
	render(React.createElement(Blog, window.props), window.react_mount);	
};

store.subscribe(view);
view();