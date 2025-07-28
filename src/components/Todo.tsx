
import {useReducer, useEffect, useRef} from 'react';
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import type { TodoProps, Action} from "../types.ts"

const getInitialTodos = () => {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
}

const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        }
      ];
    case "DELETE":
      return state.filter(todo => todo.id !== action.payload);
    case "EDIT":
      return state.map( todo =>
        todo.id === action.payload.id
        ? {...todo, text: action.payload.newText}
        : todo
      );
    case "COMPLETE":
      return state.map( todo =>
        todo.id === action.payload
        ? {...todo, completed: !todo.completed}
        : todo
      );
    case "CLEAR_ALL":
      return [];
    default:
      return state;
  }
};

const Todo = () =>{
  const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);

  const inputRef = useRef<HTMLInputElement>(null);

  const totalTasks: number = todos.length;
  const completedTasks: number = todos.filter(t => t.completed).length;
  const activeTasks: number = totalTasks - completedTasks;

  const handleClearAll = () => {
    dispatch({type: "CLEAR_ALL"});
    inputRef.current?.focus();
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);

  useEffect(()=>{
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className="max-w-sm mx-auto p-6">
        <h1 className="text-center text-2xl mb-4">To-Do List</h1>
        <TodoForm dispatch={dispatch} inputRef={inputRef} />
        <TodoList todos={todos} dispatch={dispatch} />

        { todos.length > 0 && (
          <>
            <div className="flex justify-between border-t pt-2 mt-4 text-cf-gray">
              <span>Total: {totalTasks}</span>
              <span>Active: {activeTasks}</span>
              <span>Completed: {completedTasks}</span>
            </div>
            <div className="text-end mt-4">
              <button
                onClick={handleClearAll}
                className=" bg-cf-yellow text-white py-2 px-4 cursor-pointer rounded"
              >
                Clear All
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
};

export default Todo;
