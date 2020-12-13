import React from 'react';
import '../TodoList/TodoList.css';
import Todo from '../Todo/Todo';
const TodoList = ({ todos, onToggleCompleted, onDeleteTodo }) => (
  <ul className="check-list">
    {todos.map(({ id, text, completed }) => (
      <li key={id} className="todo-item">
        <Todo
          text={text}
          completed={completed}
          onToggleCompleted={() => onToggleCompleted(id)}
          onDeleteTodo={() => onDeleteTodo(id)}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
