import React, { Component } from 'react';
import Title from './Title';
import { Loader } from 'semantic-ui-react';
import ListItem from './ListItem';

// Can you read the awesome code? It's challange for you.
const ArticlesList = ({
	articles,
	filterByTag
}) => ( 
	<ul className='articles-list'>
		{ 
			 articles.length ? 
				articles.map(article => (
					<li key={article.id} className='articles-list__container clearfix'>
						<ListItem article={article} filterByTag={filterByTag} />
					</li>
				)) :
				articles === false ? 
					<Title block='results' text='Ничего не найдено.' /> :
					<Loader active inline='centered' size='big' content='Загрузка...' />
		}
	</ul>
);

export default ArticlesList;