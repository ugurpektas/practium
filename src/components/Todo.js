import React from "react";
import Button from "./Button";

const Todo = ({
  todo,
  handleDeleteTodoItem,
  handleCheckTodoItem,
  deleteLoading,
}) => {
  return (
    <div className="todo-content">
      <span>{todo?.id}</span>
      <span className="todo-name">{todo?.name}</span>
      <div className="multi-button-content">
        <Button
          type="button"
          className="edit-button"
          onClick={() => handleCheckTodoItem(todo)}
          text="Düzenle"
        />
        <Button
          type="button"
          className="delete-button"
          onClick={() => handleDeleteTodoItem(todo?.id)}
          disabled={deleteLoading}
          text="Sil"
        />
      </div>
    </div>
  );
};

export default Todo;
