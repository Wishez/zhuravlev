import React, { Component } from 'react';
import { render } from 'react-dom'; 
import ListItem from './ListItem';
import Title from './Title';
import configureStore from './../store/configureStore.js';
import { Loader } from 'semantic-ui-react';
import { fetchArticles } from './../actions/ArticlesActions.js';
import { FETCH_POSTS } from './../constants/actionTypes.js';



const store = configureStore();

class Blog extends  Component {
	componentDidMount() {
		this.props.loadArticles();
	}

	render() {
		const  searchValue = this.props.search;
		let articles = this.props.articles,
			posts = [];


			
		if (searchValue) {
			
		    articles = articles.filter((article) => {
		    	const reg = new RegExp(searchValue, 'gi'),
		    		  isMatch = reg.test(article.title)  ||
		    		   			reg.test(article.announce_text);

		    	if (isMatch) {
		    		article.title = article.title.replace(reg, "<span style='background: #ffe276'>" + searchValue + "</span>")
		    		article.announce_text = article.announce_text.replace(reg, "<span style='background: #ffe276'>" + searchValue + "</span>")
    				return article;
		    	}

		    	return false;
	    	});

	    	posts = articles.length === 0 ? <Title block='results' text='Ничего не найдено.' /> : '';
		}

		posts = articles.length !== 0 ? articles.map((article) => (
			<li key={article.id} className='articles-list__container clearfix'>
				<ListItem article={article} />
			</li>
    	)) : <Loader active inline='centered' size='big' content='Загрузка...' />;


		
		return (
				<section className='blog'>
					<div className='container'>
						<ul className='articles-list'>
							{posts}
						</ul>
					</div>
				</section>
		);
	}
}

const view = () => {
	window.props.articles = store.getState().articles.posts;
	window.props.loadArticles = () => { 
		fetchArticles(
			store,
			{ type: FETCH_POSTS }
		);
	};

	render(React.createElement(Blog, window.props), window.react_mount);
};
store.subscribe(view);
view();