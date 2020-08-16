import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import App from './App';

import todoSlice from './store/todo/todoSlice'
import alertSlice from './store/alert/alertSlice'

const rootReducer = combineReducers({
  todos: todoSlice,
  alerts: alertSlice
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  devTools: true,
  reducer: rootReducer,
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);