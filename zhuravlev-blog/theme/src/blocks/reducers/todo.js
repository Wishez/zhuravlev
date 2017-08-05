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

const getFilteredTodos = (
	todos,
	filter
) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_ACTIVE':
			return  todos.filter(todo => (!todo.completed));
		case 'SHOW_COMPLETED':
			return todos.filter(todo => (todo.completed));
		default:
			return todos;
	}
};


import React, { Component } from 'react';
import { render } from 'react-dom'; 
import { Input, Button } from 'semantic-ui-react';
import classNames from 'classnames';

class AddTodo extends Component {
	state = {
		inputValue: ''
	}

	changeHandler(e) {
		this.setState({inputValue: e.target.value });
	}

	render() {
		let { onAddClick, changeHandler } = this.props;
		const { inputValue } = this.state;


		return (	
			<div>
				<Input
					icon='add'
					iconPosition='left'
					label={{tag: true, content: 'Add Todo'}}
					labelPosition='right'
					placeholder='Enter todo'
					value={inputValue}
					onChange={changeHandler = this.changeHandler.bind(this)}
					style={{
						marginRight: '0.5em'
					}}
				/>
				<Button 
				 	content='Add'
				 	color='brown'
				 	size='big'
				 	onClick={onAddClick(inputValue)}
				/>
		 	</div> 
		 );
	}
}; 

const TodoItem = ({
	id,
	text,
	completed
}) => (
	<li style={{
				textDecoration: 
					completed ? 
						'line-through' :
						'none',
				marginTop: '1em'
			}}
		>
		<Button onClick={onTodoClickToggle} 
			icon={this.getToggleButtonClasses(completed)} />  
		{text}
		<Button icon='trash'
			className='right'
			onClick={onTodoClickRemove}
			style={{
				marginRight: '0.5em'
			}} 
		/>
	</li>
);

const TodosList = ({
	todos,
	onTodoClickToggle,
	onTodoClickRemove
}) => (
	<ul>
		{todos.filter(todo => (
			<TodoItem 
				key={todo.id}
				{...todo}
				onTodoClickToggle={onTodoClickToggle(todo.id)}
				onTodoClickRemove={onTodoClickRemove(todo.id)}
			/>
		))}
	</ul>
);

const FilterLink =  ({
	content,
	filter,
	currentFillter,
	color,
	onFilterClick
}) => (
	<Button content={content}
		size='big'
		color={color}
		onClick={onFilterClick(filter)}
		style={{
			backgroundColor: 
				filter === currentFillter ? 
					'#211' :
					''
		}}
	 />
);

const Footer = ({
	visibilityFilter,
	onFilterClick
}) => (
	<div style={{
		marginTop: '1em'
	 }}>
	 	<FilterLink 
	 		content='Show all'
			color='green'
			filter='SHOW_ALL'
			currentFillter={visibilityFilter}
			onFilterClick={onFilterClick}
		/>
		<FilterLink 
	 		content='Show completed'
			color='red'
			filter='SHOW_COMPLETED'
			currentFillter={visibilityFilter}
			onFilterClick={onFilterClick}
		/>
		<FilterLink 
	 		content='Show active'
			color='grey'
			filter='SHOW_ACTIVE'
			currentFillter={visibilityFilter}
			onFilterClick={onFilterClick}
		/>
		
	 </div>
);

let nextTodoId = 0;
class Todo extends Component {
	
	render() {
		const { visibilityFilter, todos } = this.props;
		const filteredTodos = getFilteredTodos(todos, visibilityFilter);

		return (
			<section>
				<div className='container'>
					<AddTodo
						onAddClick={text => {
					 		store.dispatch({
					 			type: 'ADD_TODO',
					 			text,
					 			id: nextTodoId++
					 		})
					 	}}
					 />
					 <TodosList todos={filteredTodos}
					 	onTodoClickToggle={id =>  {
							store.dispatch({
								type: 'TOGGLE_TODO',
								id
							})
					 	}}
					 	onTodoClickRemove={id => {
							store.dispatch({
								type: 'REMOVE_TODO',
								id
							})
					 	}}
				 	/>
				</div>
			</section>
		);
	}

				 // 	<Footer 
				 // 		onFilterClick={filter => {
					// 		store.dispatch({
					// 			type: 'SET_VISIBILITY_FILTER',
					// 			filter
					// 		})
					// 	}}
					// 	visibilityFilter={visibilityFilter}
					// />
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
		{...store.getState()} 
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