import ITodo from "./ITodo";
import IAlertStore from "../alert/IAlertStore";

export default interface ITodoStore {
  alertStore: IAlertStore,
  todos: ITodo[],
  selectedTodo?: ITodo,
  loadTodos: () => void,
  addTodo: (todo: ITodo) => void,
  toggleCompleted: (id: number) => void,
  editTodo: (editedTodo: ITodo) => void,
  deleteTodo: (id: number) => void,
  selectTodo: (id: number) => void,
  deselect: () => void,
  getUnfinishedTodoCount: number,
  getUnfinishedUrgentTodoCount: number
}