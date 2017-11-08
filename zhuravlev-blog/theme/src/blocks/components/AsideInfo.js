import React from 'react'
import { Label, Loader, Button } from 'semantic-ui-react'

const AsideInfo = ({
	tags,
	filterByTag,
	showAllArticles,
	randomTagSize
}) => (
	<aside className='asideInfo'>
		{/* <Button size='big' 
			className="asideInfo__showAllArticles"
			content="Показать все статьи"
			onClick={showAllArticles}
		/> */}
		<ul className='asideInfo__tags'>
		{tags ?
			tags.map((tag, index) => (
				<Label
					as='a'
					content={tag.tag_name}
					key={index}
					style={{color: '#333'}}
					size={randomTagSize(
						(Math.round(Math.random() * 3))
					)}
					onClick={() => {
						filterByTag(tag.tag_name)
					}}
				/>
			)) :
			<Loader active inline='centered' size='big' content='Загрузка...' />
		}
		</ul>
	</aside>
);


export default AsideInfo;