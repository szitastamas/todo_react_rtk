import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ITodo from '../../architecture/interfaces/todo/ITodo';
import { select, remove, toggleCompleted } from '../../store/todo/todoSlice'
import { RootState } from '../..';

const TodoItem: React.FC<{ todo: ITodo} > = ({ todo }) => {

  const { todos, selectedTodo } = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch();
  // const { selectedTodo, selectTodo, deleteTodo, toggleCompleted } = useContext(todoStore)

  return (
    <tr className={`todo-item ${todo.urgent && 'urgent'}`} style={{textAlign: "center", padding: ".3rem .6rem"}}>
      <td>{ todo.userId }</td>
      <td>{ (todo.id*100).toFixed(2) }</td>
      <td className={`todo-title ${(selectedTodo && selectedTodo.id === todo.id) && "selected"}`} onClick={() => dispatch(select(todo.id))}>{ todo.title }</td>
      <td className={`status ${todo.completed && "completed"}`} onClick={() => dispatch(toggleCompleted(todo.id))}>{ todo.completed ? "Completed" : "In Progress" }</td>
      <td><button onClick={() => dispatch(remove(todo.id))}>Delete</button></td>
    </tr>
  )
}

export default TodoItem;
