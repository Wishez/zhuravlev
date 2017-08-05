// import React, { Component } from 'react';
// import { render } from 'react-dom'; 
// import ListItem from './ListItem';
// import Title from './Title';
// import { Provider } from 'react-redux'; 
// import counter from '../reducers/counter.js';
// import { createStore } from 'redux';
// import articles from '../reducers/articles.js';
// import { fetchPosts, fetchArticle } from './../actions/ArticlesActions.js';
// import { Button } from 'semantic-ui-react';
// import { increace, decreace } from './../actions/CounterActions.js';
import todo from './../reducers/todo.js';

// const counter_store = createStore(counter),
	  // store  = createStore(articles);

// class Blog extends  Component {
// 	render() {
	
//   		const { value, onDecrement, onIncrement } = this.props
 	
		
// 		return (
// 				<section className='blog'>
// 					<div className='container'>
// 						<h2 className='title'>{value}</h2>	
// 						<Button color='pink'  onClick={onIncrement}>
// 							Increace
// 						</Button>
// 						<Button color='brown' onClick={onDecrement}>
// 							Decrease
// 						</Button>
// 						<button className='btn btn-default' onClick={onIncrement}>+</button>
// 						<button className='btn btn-default' onClick={onDecrement}>-</button>
// 					</div>
// 				</section>
// 		);
// 	} 
// }
// 						// <ul className='articles-list'>
// 						// 	{posts}
// 						// </ul>

// const view = () => {
// 	render(<Blog value={counter_store.getState()} 
// 		onIncrement={() => counter_store.dispatch(increace())}
// 		onDecrement={() => counter_store.dispatch(decreace())}
// 	/>, window.react_mount);
// };

// counter_store.subscribe(view);
// view();