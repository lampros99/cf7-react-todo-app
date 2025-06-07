
import { Trash2 } from "lucide-react";


type Todo = {
    id: number;
    text: string;
}


type Action = 
 | {type: "ADD"; payload: string}
 | {type: "DELETE"; payload: number}


type TodoListProps = {
    todos: Todo[];
    dispatch: React.Dispatch<Action>
}


const TodoList = ({todos, dispatch}: TodoListProps) => {

    const handleDelete = (id: number) => {
        dispatch({ type: 'DELETE', payload: id });
    }
    return (
        <>
        <ul className="space-y-2">
            {todos.map(todo => (

                 <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>{todo.text}</span>
                <button onClick={() => handleDelete(todo.id)}

                className="text-cf-dark-red hover:underline"
                
                ><Trash2 size={18}></Trash2></button>

            </li>
            )
            )}
        </ul>
        
        </>
    )
}

export default TodoList;


