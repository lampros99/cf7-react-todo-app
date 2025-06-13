import { useState } from "react";
import { Edit, Trash2, Save, X, Square, CheckSquare } from "lucide-react";
import type { TodoListProps } from "../types";

const TodoList = ({ todos, dispatch }: TodoListProps) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (id: number, text: string) => () => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = (id: number) => {
    dispatch({ type: "EDIT", payload: { id, newText: editText } });
    setEditId(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditText("");
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const handleToggle = (id: number) => () => {
    dispatch({ type: "COMPLETE", payload: id });
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-gray-100 p-2 rounded"
        >
          {editId === todo.id ? (
            <div className="flex flex-1 gap-2 items-center">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 border rounded p-1"
              />
              <button onClick={() => handleSave(todo.id)} className="text-cf-gray">
                <Save size={18} />
              </button>
              <button onClick={handleCancel} className="text-cf-dark-red">
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex flex-1 items-center gap-2">
              <button
                className="text-green-500"
                onClick={handleToggle(todo.id)}
              >
                {todo.completed ? (
                  <CheckSquare size={18} />
                ) : (
                  <Square size={18} />
                )}
              </button>

              <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>
                {todo.text}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={handleEdit(todo.id, todo.text)}
                  className="text-cf-gray"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-cf-dark-red"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
