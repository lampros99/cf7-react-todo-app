/* eslint-disable @typescript-eslint/no-unused-vars */
import { useReducer } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

type TodoProps = {
    id: number;
    text:string;
}

type Action =
| {type: "ADD"; payload: string}
| {type: "DELETE"; payload: number}


 const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {
    switch (action.type) {
        case "ADD": {
            const newTodo: TodoProps = {
                id: Date.now(),
                text: action.payload,
            };
            return [...state, newTodo];
        }

        case "DELETE": {
            return state.filter(todo => todo.id !== action.payload);
        }

        default:
            return state;
    }
};



const Todo = () => {
    const [todos, dispatch] = useReducer(todoReducer, []);
    console.log(todos)
    return (
        <>
        <div className="max-w-sm mx-auto p-6">
        <h1 className="text-center text-2xl">TO-DO List</h1>
        <TodoForm dispatch={dispatch}></TodoForm>
        <TodoList todos={todos} dispatch={dispatch}></TodoList>
        
        </div>
        </>
    );
}



export default Todo;