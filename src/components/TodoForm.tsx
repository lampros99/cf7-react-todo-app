/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

type Action =
| {type: "ADD"; payload: string}
| {type: "DELETE"; payload: number}


type TodoFromProps = {
    dispatch: React.Dispatch<Action>;
}

const TodoForm = ({dispatch}:TodoFromProps) => {


    const [text, setText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
         if (text.trim() === "") return; 
           dispatch({ type: "ADD", payload: text });
           setText("");
    };

    return (
        <>
        <div className="max-w-sm mx-auto p-6">
        <form 
        className="flex gap-4 mb-4"
        onSubmit={handleSubmit}
        >
            <input 
            type="text" 
            value={text}
            onChange={handleChange}
            className="flex-1 border p-2 rounded" 
            placeholder="New task.." />

            <button
             type="submit"
             className="bg-cf-dark-gray text-white px-4 py-4 rounded"
             >Add
             </button>
        </form>
        </div>
        

        </>
    )
};

export default TodoForm;