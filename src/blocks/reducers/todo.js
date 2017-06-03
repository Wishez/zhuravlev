import expect from 'expect';
import deepFreeze from 'deep-freeze';

const todo = (state, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			if (!action.text) return state; 

			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case 'TOGGLE_TODO':
			if (state.id !== action.id) return state;

			return {
				...state, 
				completed: !state.completed
			}
		case 'REMOVE_TODO':
			return [
				...state.slice(0, action.id),
				...state.slice(action.id + 1)
			];
		default:
			return state;
	}
};

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action)
			];
		case 'TOGGLE_TODO':
			return state.map(t => todo(t, action));
		case 'REMOVE_TODO':
			return todo(state, action);
		default:
			return state;
	}	
};

const visibilityFilter = (
	state = 'SHOW_ALL',
	action
) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default: 
			return state;
	}
};

import { combineReducers, createStore} from 'redux';


const todosApp = combineReducers({
	todos,
	visibilityFilter 
});

const store = createStore(todosApp);



import React, { Component } from 'react';
import { render } from 'react-dom'; 
import { Input, Button } from 'semantic-ui-react';
import classNames from 'classnames';

let nextTodoId = 0;
class Todo extends Component {
	state = {
		todoValue: ''
	}

	handleChangeTodoValue(e) {
		this.setState({
			todoValue: e.target.value
		});

	}

	render() {
		const { visibilityFilter, todos } = this.props;
		const { todoValue } = this.state;

		let listTodos = todos.map(todo => (
	 		<li key={todo.id}
	 			onClick={() => { 
	 					store.dispatch({
	 						type: 'TOGGLE_TODO',
	 						id: todo.id
	 					});
 				}}
	 			style={{
	 				textDecoration: 
	 					todo.completed ? 
	 						'line-throught !important' :
	 						'none',
	 				marginTop: '1em'
	 			}}
	 		>
	 			<Button icon={this.getToggleButtonClasses(todo.completed)} />  
	 			{todo.text}
	 			<Button icon='trash'
	 				className='right'
	 				onClick={() => { 
	 					store.dispatch({
	 						type: 'REMOVE_TODO',
	 						id: todo.id
	 					});
	 				}} 
	 			/>
	 		</li>
	 	));
		console.log(visibilityFilter);
	 	if (visibilityFilter === 'SHOW_COMPLETED')
	 		listTodos = listTodos.filter(todo => (todo.completed));
	 	else if (visibilityFilter === 'SHOW_ACTIVE')
	 		listTodos = listTodos.filter(todo => (!todo.completed));

		return (
			<section>
				<div className='container'>
					<Input
						icon='add'
						iconPosition='left'
						label={{tag: true, content: 'Add Todo'}}
						labelPosition='right'
						placeholder='Enter todo'
						value={todoValue}
						onChange={this.handleChangeTodoValue = this.handleChangeTodoValue.bind(this)}
						style={{
							marginRight: '0.5em'
						}}
					/>
					 <Button 
					 	content='Add'
					 	color='brown'
					 	size='big'
					 	onClick={() => {
					 		store.dispatch({
					 			type: 'ADD_TODO',
					 			text: todoValue,
					 			id: nextTodoId++
					 		});
					 		this.setState({todoValue: ''});
					 	}}
					 />
					 <ul>
					 	{listTodos}
					 </ul>
					 <div style={{
						marginTop: '1em'
					 }}>
						<Button content='Show all'
								size='big'
								color='green'
								onClick={() => {
									store.dispatch({
										type: 'SET_VISIBILITY_FILTER',
										filter: 'SHOW_ALL'
									})
								}}
								style={{
									marginRight: '0.5em'
								}}
						 />
						 <Button content='Show completed'
						 		size='big'
								color='grey'
								onClick={() => {
									store.dispatch({
										type: 'SET_VISIBILITY_FILTER',
										filter: 'SHOW_COMPLETED'
									})
								}}
								style={{
									marginRight: '0.5em'
								}}
						 />
						<Button content='Show active'
								size='big'
								color='red'
								onClick={() => {
									store.dispatch({
										type: 'SET_VISIBILITY_FILTER',
										filter: 'SHOW_ACTIVE'
									})
								}}
						 />
					 </div>
				</div>
			</section>
		);
	}

	getToggleButtonClasses(completed) {
		return classNames({
			'toggle': true,
			'off': !completed,
			'on': completed
		});
	}
}

const view = () => {
	render(<Todo 
		todos={store.getState().todos} 
		visibilityFilter={store.getState().visibilityFilter}
	/>, window.react_mount);
};


store.subscribe(view);
view();

const testRemoveTodo = () => {
	const stateBefore = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		},
		{
			id: 1,
			text: 'Test Remove Todo',
			completed: true
		}
	];

	const action = {
		type: 'REMOVE_TODO',
		id: 1
	};
	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual(stateAfter);
}
const testToggleTodo = () => {
	const stateBefore = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		},
		{
			id: 1,
			text: 'Test Add Todo',
			completed: true
		},
		{
			id: 2,
			text: 'Test Toggle Todo',
			completed: false
		}
	];	

	const action = {
		type: 'TOGGLE_TODO',
		id: 2	
	};

	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		},
		{
			id: 1,
			text: 'Test Add Todo',
			completed: true
		},
		{
			id: 2,
			text: 'Test Toggle Todo',
			completed: true
		}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual(stateAfter);

};

const testAddTodo = () => {
	const stateBefore = [];
	const action = {
		type: 'ADD_TODO',
		id: 0,
		text: 'Learn Redux'
	};

	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual(stateAfter);
};

testToggleTodo();
testRemoveTodo();
testAddTodo();
console.log('Todo Tests were completed!');


export default todo;
// console.log('Initial state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispathccing ADD_TODO.');;
// store.dispatch({
// 	type: 'ADD_TODO',
// 	id: 0,
// 	text: 'Learn Redux'
// });

// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispathccing ADD_TODO.');;
// store.dispatch({
// 	type: 'ADD_TODO',
// 	id: 1,
// 	text: 'Change State'
// });

// console.log('Dispathccing ADD_TODO.');;
// store.dispatch({
// 	type: 'ADD_TODO',
// 	id: 2,
// 	text: 'Remove Second Todo'
// });

// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispathccing REMOVE_TODO.');;
// store.dispatch({
// 	type: 'REMOVE_TODO',
// 	id: 1
// });

// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispathccing TOGGLE_TODO.');;
// store.dispatch({
// 	type: 'TOGGLE_TODO',
// 	id: 2
// });

// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');


// console.log('Dispathccing SET_VISIBILITY_FILTER.');;
// store.dispatch({
// 	type: 'SET_VISIBILITY_FILTER',
// 	filter: 'SHOW_COMPLETED'
// });

// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');