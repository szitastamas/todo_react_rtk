import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ITodo from '../../architecture/interfaces/todo/ITodo'
import { add, edit, deselect } from '../../store/todo/todoSlice'
import CustomInput from '../utility/CustomInput'
import { RootState } from '../..';

const TodoForm = () => {
  // const { getUnfinishedTodoCount, getUnfinishedUrgentTodoCount, selectedTodo, addTodo, editTodo, deselect } = useContext(todoStore);

  const { selectedTodo, unfinishedTodosCount, unfinishedUrgentTodosCount} = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [dueDate, setDueDate] = useState("9999-99-99")
	const [isEditState, setIsEditState] = useState(false);


  useEffect(() => {
    
    if(selectedTodo){
      setIsEditState(true)
      setTitle(selectedTodo.title)
      setUrgent(selectedTodo.urgent)
      selectedTodo.urgent && setDueDate(selectedTodo.dueDate);
    }

  }, [selectedTodo])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(title.replace(/ /g, "").length === 0){
      return;
    }

    isEditState ? handleEditTodo() : dispatch(add({ title, urgent, dueDate }));

    resetForm();
  }

  const handleEditTodo = () => {

    const editedTodo: ITodo = {
      ...selectedTodo!,
      title,
      urgent,
      dueDate
    }

    dispatch(edit(editedTodo));
  }

  const resetForm = () => {
    setTitle("");
    setUrgent(false);
    setIsEditState(false);
    dispatch(deselect());
  }

	return (
		<div className='form-container'>
			<h4>You have {unfinishedTodosCount} unfinished todo(s). From that you have { unfinishedUrgentTodosCount } urgent todo(s)!</h4>
			<form id='todo-form' onSubmit={handleSubmit}>
        <CustomInput elementId="title" elementType="text" labelText="Title" value={title} action={setTitle} />
        <CustomInput elementId="urgent" elementType="checkbox" labelText="Check if todo is urgent..." value={urgent} action={setUrgent} />
        { urgent && <CustomInput elementId="date" elementType="date" labelText="Due Time Picker" value={dueDate} action={setDueDate} /> }
				<button type='submit' id="submit-btn">{isEditState ? 'Edit Todo' : 'Add Todo'}</button>
        { isEditState && <button onClick={resetForm}>Cancel</button> }
			</form>
		</div>
	);
};

export default TodoForm;
