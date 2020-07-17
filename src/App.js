import React, { Component } from 'react';

import './App.css'

import TodoForm  from './components/TodoForm';
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'
import { getTodos, saveTodos } from './utils/storeTodos'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      filteredTodos: null,
    }
  }

  componentDidMount() {
    const todos = getTodos()
    this.setState({ todos })
  }

  handleCreateTodo = (content) => {
    const { todos } = this.state
    const todo = {
      id: new Date().getTime(),
      content: content,
      completed: false,
    }
    const newTodos = [...todos, todo]

    saveTodos(newTodos)
    this.setState({
      todos: newTodos,
    })
  }

  handleToggleTodo = (id) => {
    const { todos: oldTodos } = this.state
    const todos = oldTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))

    saveTodos(todos)
    this.setState({ todos })
  }

  handleUpdateTodo = (id, content) => {
    const { todos: oldTodos } = this.state
    const todos = oldTodos.map((todo) => (todo.id === id ? { ...todo, content: content } : todo))

    saveTodos(todos)
    this.setState({ todos })
  }

  handleRemoveTodo = (removeId) => {
    const { todos: oldTodos } = this.state
    const todos = oldTodos.filter(({ id }) => id !== removeId)

    saveTodos(todos)
    this.setState({ todos })
  }

  todosFilter = (type) => {
    const todos = this.state.todos
    let filteredTodos

    switch (type) {
      case 'done':
        filteredTodos = todos.filter((todo) => todo.completed)
        break
      case 'undone':
        filteredTodos = todos.filter((todo) => !todo.completed)
        break
      default:
        filteredTodos = null
    }

    this.setState({ filteredTodos })
  }

  clearTodosCompleted = () => {
    const todos = this.state.todos
    const incompletedTodos = todos.filter((todo) => !todo.completed)
    saveTodos(incompletedTodos)
    this.setState({ todos: incompletedTodos, filteredTodos: null })
  }

  render() {
    const { todos, filteredTodos } = this.state
    const count = todos.filter((todo) => !todo.completed).length
    return (
      <div className='App'>
        <TodoForm onCreateTodo={this.handleCreateTodo} />
        <TodoList
          todos={todos}
          filteredTodos={filteredTodos}
          onToggleTodo={this.handleToggleTodo}
          onRemoveTodo={this.handleRemoveTodo}
          handleUpdateTodo={this.handleUpdateTodo}
        />
        <TodoFilter count={count} todosFilter={this.todosFilter} clearTodosCompleted={this.clearTodosCompleted} />
      </div>
    )
  }
}

export default App
