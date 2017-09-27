import React, { Component } from 'react';
import { render } from 'react-dom';
import Title from './Title';
import ReactHtmlParser from 'react-html-parser';
import ArticleMeta from './ArticleMeta';
import configureStore from './../store/configureStore.js';
import { FETCH_ARTICLE, SET_VISIBILITY_FILTER, visibilityFilters } from './../constants/actionTypes.js';
import { Loader, Container } from 'semantic-ui-react';
import { fetchData } from './../actions/ArticlesActions.js';
import Tags from './Tags';
import ReactDisqusComments from 'react-disqus-comments';

const store = configureStore();

export default class Article extends Component {
	componentDidMount() {

		// let doc = document,
  //           dsq = doc.createElement('script'),
  //           head = doc.getElementsByTagName('head')[0],
  //           body =  doc.getElementsByTagName('body')[0];
        
        // dsq.type = 'text/javascript';
        // dsq.async = true;
      
        // dsq.setAttribute('data-timestamp', +new Date());

        // console.log(body, 'body');
        // console.log(head, 'head');
        // (head || body).appendChild(dsq);
        window.domain = 'filipp-zhuravlev.ru'
		this.props.loadArticle();
	}

	handleNewComment(comment) {
		console.log(comment.text);
	}

	render() {
		const post = this.props.article;
		const { article_id } = this.props;
	
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
				// <ReactDisqusComments
    //     			shortname="filipp-zhuravlev"
    //     			identifier={`articles/${article_id}`}
    //     			title={post.title}
    //     			url={window.location.href}
    //     			category_id={article_id}
    //     			onNewComment={this.handleNewComment} />

const view = () => {
	window.props.article = store.getState().articles.article;
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
