import React from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';

const ArchiveItem = ({
	year,
	articles
}) => (
	<div>
		<Title block='archiveListItem' text={year} />
		<ul className='articlesByYearList'>
			{articles.map(article => (
				<li key={article.id}
					className='articlesByYearListItem'>
					<a href={`/articles/${article.id}`}
						className='articlesByYearListItem__refer'>
						{article.title}
					</a>
				</li>
			))}
		</ul>
	</div>
);

export default ArchiveItem;