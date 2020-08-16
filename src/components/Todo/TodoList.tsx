import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import TodoItem from './TodoItem';
import { RootState } from '../..';

const TodoList = () => {

	const todos = useSelector((state: RootState) => state.todos.todos)

	const renderTodoRows = () => {
		if (todos.length === 0 || !todos) {
			return (
				<tr>
					<td colSpan={5}>No todos to show</td>
				</tr>
			);
		} else {
			return todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
		}
	};

	return (
		<Fragment>
			<table className='todo-table'>
				<thead>
					<tr>
						<th>UserId</th>
						<th>ID</th>
						<th>Title</th>
						<th>Completed</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{ renderTodoRows() }</tbody>
			</table>
		</Fragment>
	);
};

export default TodoList;
