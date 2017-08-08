import React, { Component } from 'react';
import { render } from 'react-dom'; 
import configureStore from './../store/configureStore.js';
import { fetchData, filterArticles } from './../actions/ArticlesActions.js';
import { 
	FETCH_POSTS,
	visibilityFilters,
	SET_VISIBILITY_FILTER,
	FETCH_TAGS
} from './../constants/actionTypes.js';
import ArticlesList from './ArticlesList';
import AsideInfo from './AsideInfo';



const store = configureStore();

class Blog extends Component {


	componentDidMount() {
		const { search, showSearch, loadArticles, loadTags } = this.props;

		if (search) {
			showSearch();
		}
		loadTags();
		loadArticles();
	}

	filterByTag = tag_name => {
		store.dispatch({
			type: SET_VISIBILITY_FILTER,
			filter: visibilityFilters.SHOW_BY_TAG,
			tag: tag_name
		});				
	}
	showAllArticles = () => {
		store.dispatch({
			type: SET_VISIBILITY_FILTER,
			action: visibilityFilters.SHOW_ALL,
			value: '',
			tag: ''
		});
	}

	randomTagSize = size => {
		console.log(size);
		switch (size) {
			case 1:
				return 'massive';
			case 2: 
				return 'big';
			case 3:
				return 'huge';
			default:
				return 'big';
		};

	}	
	render() {
		const {
			search,
			visibilityFilter,
			showSearch,
			tags
		} = this.props;

		let articles = this.props.articles;
		return (
				<section className='blog'>
					<div className='container'>
						<AsideInfo 
							tags={tags}
							filterByTag={this.filterByTag}
							showAllArticles={this.showAllArticles}
							randomTagSize={this.randomTagSize}
						/>
						<ArticlesList articles={filterArticles(articles, 
							{
								filter: visibilityFilter.filter,
								value: search,
								tag: visibilityFilter.tag
							})}
							filterByTag={this.filterByTag}
						 />
					</div>
				</section>
		);
	}
}

const view = () => {
	const state = store.getState();
	const articlesState = state.articles;
	window.props.articles = articlesState.posts;
	window.props.visibilityFilter = state.visibilityFilter;
	window.props.tags = articlesState.tags;
	window.props.loadArticles = () => { 
		fetchData(
			store,
			{ type: FETCH_POSTS }
		);
	};
	
	window.props.loadTags = () => {
		fetchData(
			store,
			{ type: FETCH_TAGS }
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