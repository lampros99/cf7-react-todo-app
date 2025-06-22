import { useReducer,useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import type { TodoProps, Action } from "../types"

const getInitialTodos = () => {
   const stored = localStorage.getItem("todos");
   return stored ?JSON.parse(stored) : []
}

// type TodoProps = {
//     id: number;
//     text:string;
// }
 
// type Action =
// | {type: "ADD"; payload: string}
// | {type: "DELETE"; payload: number}


 const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {
    switch (action.type) {
        case "ADD": {
            // const newTodo: TodoProps = {
            //     id: Date.now(),
            //     text: action.payload,
            // };
            // return [...state, newTodo];
            return [
                ...state,
                {
                    id:Date.now(),
                    text:action.payload,
                    completed: false,
                }
            ]
        }

        case "DELETE": 
            return state.filter(todo => todo.id !== action.payload);
        case "EDIT":
            return state.map( todo => 
                todo.id === action.payload.id 
                ? {...todo, text:action.payload.newText}
                : todo
            )
            case "COMPLETE":
                return state.map ( todo => 
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



const Todo = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);
    const totalTasks: number = todos.length;
    const completedTasks: number = todos.filter(t => t.completed).length;
    const activeTasks: number = totalTasks - completedTasks;

    console.log(todos)

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const handleClearAll = () => {
        dispatch({type: "CLEAR_ALL"})
    }

    return (
        <>
        <div className="max-w-sm mx-auto p-6">
        <h1 className="text-center text-2xl">TO-DO List</h1>
        <TodoForm dispatch={dispatch}></TodoForm>
        <TodoList todos={todos} dispatch={dispatch}></TodoList>

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
            className="bg-red-600 text-white py-2 px-4 rounded" 
            >
            Clear All
            </button>
        
        </div>
            </>
        ) }


    </div>
    </>
    );
}



export default Todo;

