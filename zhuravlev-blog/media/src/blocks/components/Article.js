import React, { Component } from 'react';
import { render } from 'react-dom';
import Title from './Title';
import ReactHtmlParser from 'react-html-parser';
import ArticleMeta from './ArticleMeta';
import configureStore from './../store/configureStore.js';
import { FETCH_ARTICLE, SET_VISIBILITY_FILTER, visibilityFilters } from './../constants/actionTypes.js';
import { Loader } from 'semantic-ui-react';
import { fetchArticles } from './../actions/ArticlesActions.js';
import Tags from './Tags';

			    	// <Tags 
			    	// 	tags={ post.tags }
			  			// filterByTag={(tag_name) => 
			  			// 	{
			  			// 		store.dispatch({
			  			// 			type: SET_VISIBILITY_FILTER,
			  			// 			action: {
			  			// 				filter: visibilityFilters.SHOW_BY_TAG,
			  			// 				tag: tag_name
			  			// 			}
			  			// 		})
			  			// 	}

			  			// }
			    	// />
const store = configureStore();

export default class Article extends Component {
	componentDidMount() {
		this.props.loadArticle();
	}

	render() {
		const post = this.props.article;
		
		const loaded = post ? 
				<div className='container'>
			    	<Title block='article' text={ post.title } />
			    	<ArticleMeta date={ new Date(post.created_at).toLocaleDateString() } />
				    <div className='article__text text'>
					   { ReactHtmlParser(post.text) }
				    </div>
				    <a href='/../..' className='article__toArticles'>
				    	Ко всем статьям
				   </a>
				</div > :
				 <Loader active inline='centered' size='big' content='Загрузка...' />;

		return (
			<article className='article'>
				{loaded}
			</article>
		);
	}
}


const view = () => {
	window.props.article = store.getState().articles.article;
	window.props.loadArticle = () => {
		fetchArticles(
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
