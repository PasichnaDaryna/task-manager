import React, { Component } from 'react';
import TodoEditor from './components/TodoEditor';

import shortid from 'shortid';
// import initialTodos from './initialTodos.json';
import Filter from './components/Filter/Filter';
import Container from './components/Container/Container';
import IconButton from './components/IconButton/IconButton';
import TodoList from './components/TodoList/TodosList';
import { ReactComponent as AddIcon } from './icons/add.svg';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
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

  toggleCompleted = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodos = this.getCompletedTodos();
    // const percentCompleted = completedTodos / totalTodoCount;
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container className="container">
        <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
        {/* <TodoEditor onSubmit={this.addTodo} /> */}
        <ul className="stat-list">
          <li>Общее количество задач - {totalTodoCount}</li>
          <li>Количество выполненных задач {completedTodos}</li>
          {/* <span> {percentCompleted}%</span> */}
        </ul>
        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
