import React, { Component } from 'react';

export default class NotFound extends  Component {
	render() {
		return (
			<div className='notFound'>
				<h3 className='text-center notFound'>
					Страницы не существует. 
				</h3>
				<a href='/'>На главную.</a>
			</div>
		);
	}
}