import React, { Component } from 'react';

import './index.css'

class TodoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }
  }

  onSubmit = (event) => {
    event.preventDefault()

    const { onCreateTodo } = this.props
    const { content } = this.state
    onCreateTodo(content)
    this.clearContent()
  }

  onChangeContent = (event) => {
    this.setState({
      content: event.currentTarget.value
    })
  }

  clearContent() {
    this.setState({
      content: '',
    })
  }

  render() {
    const { content } = this.state

    return (
      <form className='todo-form' onSubmit={this.onSubmit}>
        <input
          type='text'
          placeholder='What needs to be done?'
          value={content}
          onChange={this.onChangeContent}
        />
      </form>
    )
  }
}

export default TodoForm
