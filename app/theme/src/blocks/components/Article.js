import React, { Component } from 'react';
import { render } from 'react-dom';
import Title from './Title';
import ReactHtmlParser from 'react-html-parser';
import ArticleMeta from './ArticleMeta';
import configureStore from './../store/configureStore.js';
import { FETCH_ARTICLE, SET_VISIBILITY_FILTER, visibilityFilters } from './../constants/actionTypes.js';
import { Loader, Container } from 'semantic-ui-react';
import { fetchData } from './../actions/ArticlesActions.js';
import { setData, getData } from '../constants/localStorage.js';

const store = configureStore();

export default class Article extends Component {
	componentDidMount() {
		this.props.loadArticle();
		setData('article', [{}]);
	}

	render() {
		const post = typeof getData('article') !== 'undefined' ? 
			JSON.parse(getData('article')) : 
			{};
		
		
		return (
			<Container>
			   {post ?
				<article className='article'>
					<Title block='article' text={ post.title } />
			    	<ArticleMeta date={ new Date(post.created_at).toLocaleDateString() } />
				    <div className='article__text text'>
					   { ReactHtmlParser(post.text) }
				    </div>
				    <a href='/../..' className='article__toArticles'>
				    	Ко всем статьям
				   </a>
				</article> :
				<Loader active inline='centered' size='big' content='Загрузка...' />}
			</Container>
		);
	}
}

const view = () => {
	window.props.loadArticle = () => {
		fetchData(
			store,
			{ 	
				type: FETCH_ARTICLE,
				article_id: window.props.article_id
			}
		);
	};
	
	render(React.createElement(Article, window.props), window.react_mount);
};
store.subscribe(view);
view();
