import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ITodo from '../../architecture/interfaces/todo/ITodo'

type initialStateType = {
    todos: ITodo[],
    selectedTodo?: ITodo,
    unfinishedTodosCount: number,
    unfinishedUrgentTodosCount: number
}

const initialState: initialStateType = {
    todos: [
        {
          userId: 1,
          id: Math.random(),
          title: 'Learn MobX',
          completed: false,
          urgent: true,
          dueDate: "2020-08-21"
        },
        {
          userId: 1,
          id: Math.random(),
          title: 'Practise with React-Toolkit',
          completed: true,
          urgent: false,
          dueDate: "9999-99-99"
        },
        {
          userId: 1,
          id: Math.random(),
          title: 'Figure out why it doesnt get deleted',
          completed: true,
          urgent: true,
          dueDate: "2020-08-17"
        },
        {
          userId: 1,
          id: Math.random(),
          title: 'Practise with MobX-Map',
          completed: false,
          urgent: false,
          dueDate: "9999-99-99"
        },
      ],
      selectedTodo: undefined,
      unfinishedTodosCount: 2,
      unfinishedUrgentTodosCount: 1
}

type prepareTodoObject = { title: string, urgent: boolean, dueDate: string}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        add: {
            reducer: (state, { payload }: PayloadAction<ITodo>) => {
                state = {
                    ...state,
                    todos: [...state.todos, payload],
                    unfinishedTodosCount: !payload.completed ? state.unfinishedTodosCount++ : state.unfinishedTodosCount,
                    unfinishedUrgentTodosCount: !payload.completed && payload.urgent ? state.unfinishedUrgentTodosCount++ : state.unfinishedUrgentTodosCount
                }
            },
            prepare: ({ title, urgent, dueDate }: prepareTodoObject) => {
                return {
                    payload: {
                        userId: 1,
                        id: Math.random(),
                        title,
                        completed: false,
                        urgent,
                        dueDate
                    }
                }
            }
        },
        edit: (state, { payload }: PayloadAction<ITodo>) => {
            state = {
                ...state,
                todos: state.todos.map(todo => todo.id === payload.id ? payload : todo)
            }
        },
        remove: (state, { payload }: PayloadAction<number>) => {
            state = {
                ...state,
                todos: state.todos.filter(todo => todo.id !== payload)
            }
        },
        toggleCompleted: (state, { payload }: PayloadAction<number>) => {
            state = {
                ...state,
                todos: state.todos.map(todo => todo.id === payload ? {...todo, completed: !todo.completed} : todo)
            }
        },
        select: (state, { payload }: PayloadAction<number>) => {
            state = {
                ...state,
                selectedTodo: state.todos.find(todo => todo.id === payload)
            }
        },
        deselect: (state) => {
            state = {
                ...state,
                selectedTodo: undefined
            }
        }
    }
})

export const { add, edit, remove, toggleCompleted, select, deselect } = todoSlice.actions;

export default todoSlice.reducer;
