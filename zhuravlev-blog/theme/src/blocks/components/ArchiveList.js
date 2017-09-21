import React, { Component } from 'react';
import Title from './Title';
import { Loader } from 'semantic-ui-react';
import ArchiveItem from './ArchiveItem';

// Can you read the awesome code? It's challange for you.
const ArchiveList = ({
	archive
}) => ( 
	<ul className='archiveList'>
		{ 
			archive.length ? 
				archive.map(year => (
					<li className='archiveListItem' key={year.id}>
						<ArchiveItem {...year} />
					</li>
				)) : 
				<Loader active inline='centered' size='big' content='Загрузка...' />
		}
	</ul>
);

export default ArchiveList;