import React, { Component } from 'react';
import { render } from 'react-dom'; 
import configureStore from './../store/configureStore.js';

import { fetchData } from './../actions/ArticlesActions.js';
import { filterArticles, showMore } from './../actions/VisibilityFilterActions.js';
import { 
	FETCH_POSTS,
	visibilityFilters,
	SET_VISIBILITY_FILTER,
	FETCH_TAGS
} from './../constants/actionTypes.js';
import ArticlesList from './ArticlesList';
import AsideInfo from './AsideInfo';
import { Button } from 'semantic-ui-react';
import { setData, getData } from '../constants/localStorage.js';

const store = configureStore();

class Blog extends Component {


	componentDidMount() {
		const { search, showSearch, loadArticles, loadTags } = this.props;
		setData('posts', []);
		setData('tags', []);


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
	showMoreArticles = () => {
		store.dispatch(showMore());
		return ;
	};
	getEmptyArrayIfIsUndefined = variable => (
		typeof variable !== 'undefined' ? JSON.parse(variable) : []
	)

	render() {
		const {
			search,
			visibilityFilter,
			showSearch
		} = this.props;

		// shown_articles
		return (
				<section className='blog'>
					<div className='container'>
						<AsideInfo 
							tags={this.getEmptyArrayIfIsUndefined(getData('tags'))}
							filterByTag={this.filterByTag}
							showAllArticles={this.showAllArticles}
							randomTagSize={this.randomTagSize}
						/>
						<ArticlesList articles={filterArticles(
							this.getEmptyArrayIfIsUndefined(getData('posts')),
							{
								filter: visibilityFilter.filter,
								value: search,
								tag: visibilityFilter.tag
							})}
							filterByTag={this.filterByTag}
						 />
						<div className='clearfix' />
						{/* <Button size='big'
							content='Больше статей'
							className='blog__moreArticles'
							onClick={this.showMoreArticles} 
						/> */}
					</div>
				</section>
		);
	}
}

const view = () => {
	const state = store.getState();

	const visibilityFilter = state.visibilityFilter;

	
	window.props.visibilityFilter = visibilityFilter;
	// window.props.shown_articles = visibilityFilter.shown_articles;

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