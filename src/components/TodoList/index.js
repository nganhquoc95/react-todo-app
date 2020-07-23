import React, { Component } from 'react'

import TodoItem from '../TodoItem'

import './index.css'

export default class TodoList extends Component {
  render() {
    const { todos, filteredTodos, onToggleTodo, onRemoveTodo, handleUpdateTodo } = this.props
    const todoList = filteredTodos || todos
    if (todoList.length === 0) {
      return (
        <section className='todo-list'>
          <div className='todo-list-item'>No things to do</div>
        </section>
      )
    }

    return (
      <section className='todo-list'>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleTodo={onToggleTodo}
            onRemoveTodo={onRemoveTodo}
            handleUpdateTodo={handleUpdateTodo}
          />
        ))}
      </section>
    )
  }
}
