import React, { Component } from 'react';

export default class ArticleMeta extends  Component  {
	render() {
		const { date } = this.props;
		return(
			<div className='article__meta' style={{marginTop: '0.5em'}}>
				<strong>
					Опубликовано:
				</strong>
				&nbsp;
			    <small className='article__date'>
			    	{ date }
			    </small>
			    &nbsp;&nbsp;&nbsp;
			    <strong>Автор:</strong>
			    &nbsp;
			    <a className="not-follow" href="https://shining-present.ru" 
		    	   itemscope 
		    	   itemtype="http://schema.org/Person">
			    	<small itemprop="name">
			    		Филипп Журавлёв
			    	</small>
			    </a>
		    </div>
		);
		
	}
}