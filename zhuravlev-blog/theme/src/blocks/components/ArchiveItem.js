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
					<Link to={`/articles/${article.id}`}
						className='articlesByYearListItem__refer'>
						{article.title}
					</Link>
				</li>
			))}
		</ul>
	</div>
);

export default ArchiveItem;