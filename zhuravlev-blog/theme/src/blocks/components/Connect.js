import React, { Component } from 'react';
import Title from './Title';
import ConnectForm from './ConnectForm';
import { render } from 'react-dom';
import configureStore from './../store/configureStore.js';
import { Provider }  from 'react-redux';  

const store = configureStore();

class Connect extends Component{
	render() {
		return (
			<Provider store={store}>
				<section className='connect'>
					<div className='container'>
						<Title block='connect' text='Свяжитесь со мной'/>
						<ConnectForm />
					</div>
				</section>
			</Provider> 
   		);
	} 
}

export default function view() {
	render(React.createElement(Connect, window.props), window.react_mount);
};