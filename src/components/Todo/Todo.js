import React from 'react';

const Todo = ({ text, completed, onToggleCompleted, onDeleteTodo }) => (
  <>
    <input
      type="checkbox"
      className="checkbox"
      checked={completed}
      onChange={onToggleCompleted}
    />
    <p className="todo-text">{text}</p>
    <button type="button" onClick={onDeleteTodo} className="close"></button>
  </>
);

export default Todo;
