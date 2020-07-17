import React, { Component } from 'react'

import './index.css'

class TodoFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'all'
    }
  }

  handleTodosFilter = (type) => {
    this.setState({ type })
    this.props.todosFilter(type)
  }

  handleClearTodoCompleted = () => {
    this.props.clearTodosCompleted()
    this.setState({ type: 'all' })
  }

  render() {
    const { type } = this.state
    const { count } = this.props

    return (
      <div className='todo-filter'>
        <div className='todo-counter'>{count} todos left</div>
        <div className='todo-filter-action'>
          <button
            className={`btn btn-action ${type === 'all' ? 'active' : ''}`}
            onClick={() => this.handleTodosFilter('all')}
          >
            All
          </button>
          <button
            className={`btn btn-action ${type === 'undone' ? 'active' : ''}`}
            onClick={() => this.handleTodosFilter('undone')}
          >
            Undone
          </button>
          <button
            className={`btn btn-action ${type === 'done' ? 'active' : ''}`}
            onClick={() => this.handleTodosFilter('done')}
          >
            Done
          </button>
        </div>

        <div className='todo-clear-complete'>
          <button className='btn btn-action' onClick={this.handleClearTodoCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
    )
  }
}

export default TodoFilter
