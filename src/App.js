import React, { Component } from 'react';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList/TodosList';
import shortid from 'shortid';
import initialTodos from './initialTodos.json';
import Filter from './components/Filter/Filter';
import Container from './components/Container/Container';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };
  // add task
  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  getCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce(
      (total, todo) => (todo.completed ? (total = 1) : total),
      0,
    );
  };

  render() {
    const { todos, filter } = this.state;
    const totalTodoCount = todos.length;
    const completedTodos = this.getCompletedTodos();
    const percentCompleted = completedTodos / totalTodoCount;
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container className="container">
        <TodoEditor onSubmit={this.addTodo} />
        <ul className="stat-list">
          <li>Общее количество задач - {totalTodoCount}</li>
          <li>Количество выполненных задач {completedTodos}</li>
          <span> {percentCompleted}%</span>
        </ul>
        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList todos={visibleTodos} onDeleteTodo={this.deleteTodo} />
      </Container>
    );
  }
}

export default App;
