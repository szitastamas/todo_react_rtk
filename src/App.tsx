import React from 'react'
import { useSelector } from 'react-redux'

import './App.css'

import TodoForm from './components/Todo/TodoForm'
import Alert from './components/Alert/Alert'
import TodoList from './components/Todo/TodoList'
import { RootState } from '.'

function App() {

  const alerts = useSelector((state: RootState) => state.alerts)

  return (
    <div className="container">
      <TodoList />
      <TodoForm />
      { alerts.length > 0 && alerts.map(alert => <Alert key={alert.id} alert={alert} />) }
    </div>
  );
}

export default App;
