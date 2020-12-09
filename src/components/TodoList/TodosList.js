import React from 'react';
import '../TodoList/TodoList.css';
const TodoList = ({ todos, onDeleteTodo }) => (
  <ul className="check-list">
    {todos.map(({ id, text }) => (
      <li key={id} className="todo-item">
        <p className="todo-text">{text}</p>
        <button className="close" onClick={() => onDeleteTodo(id)}></button>
      </li>
    ))}
  </ul>
);

export default TodoList;
