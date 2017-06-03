import React, { Component } from 'react';
import { render } from 'react-dom'; 
import ListItem from './ListItem';
import Title from './Title';
import 'whatwg-fetch';

class Blog extends  Component {

	state = {
		articles: []
	}

	loadArticles() {

		fetch('/api/v0/articles/')
				.then(response => response.json())
				.then(data => this.setState({articles: data}))
				.catch(err => console.log(err))
	}

	componentDidMount() {
		this.loadArticles();
	}


	render() {
		const  searchValue = this.props.search;
		let articles = this.state.articles;
			
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
		}

		const posts = articles.length !== 0 ? articles.map((article) => (
			<li key={article.id} className='articles-list__container clearfix'>
				<ListItem article={article} />
			</li>
    	)) : <Title block='results' text='Ничего не найдено.' />;


		
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

render(React.createElement(Blog, window.props), window.react_mount);