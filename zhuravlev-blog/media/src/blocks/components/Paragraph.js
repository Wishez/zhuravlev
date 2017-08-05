import React, { Component } from 'react';

export default class Paragraph extends  Component {
	render() {
		const { text, block } = this.props;
		return (
			<p className={block + '__paragraph paragraph'}>
				{text}
			</p>
		);
	}
}