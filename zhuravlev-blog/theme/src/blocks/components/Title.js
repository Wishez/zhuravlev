import React, { Component } from 'react';

export default class Title extends Component{
	render() {
		const { text, block } = this.props;
		return (
			<h2 className={block + '__title title'}>
				{text}
			</h2>
		);
	}
}