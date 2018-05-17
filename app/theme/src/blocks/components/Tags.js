import React from 'react'
import { Label } from 'semantic-ui-react'

const Tags = ({
	tags,
	filterByTag
}) => ( 
	<ul className='article__tags'>
		{
			tags.map((tag, index) => (
				<Label
					as='a'
					content={tag}
					key={index}
					style={{color: '#333'}}
					size='large'
					onClick={() => {
						filterByTag(tag)
					}}
				/>
			))
		}
	</ul>

);

export default Tags;