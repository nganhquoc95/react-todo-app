import React, { Component } from 'react'

import check from '../../assets/images/check-circle.svg'
import checkGreen from '../../assets/images/check-circle-green.svg'
import edit from '../../assets/images/edit.svg'
import remove from '../../assets/images/remove.svg'

import './index.css'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)

    const { todo } = this.props
    this.state = {
      editMode: false,
      content: todo.content,
    }

    this.inputRef = React.createRef()
  }

  componentDidUpdate() {
    if (this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    })
  }

  onChangeContentTodo = (event) => {
    this.setState({
      content: event.currentTarget.value
    })
  }

  onUpdateTodo = (event) => {
    event.preventDefault()

    const { todo, handleUpdateTodo } = this.props
    handleUpdateTodo(todo.id, this.state.content)
    this.toggleEditMode()
  }

  render() {
    const { todo, onToggleTodo, onRemoveTodo } = this.props
    const { editMode, content } = this.state

    if (editMode) {
      return (
        <div className='todo-list-item'>
          <button className='btn btn-no-padding btn-check' onClick={() => onToggleTodo(todo.id)}>
            <img src={todo.completed ? checkGreen : check} alt='Check todo' width={24} height={24} />
          </button>
          <form className='form' onSubmit={this.onUpdateTodo}>
            <input type='text' placeholder='Todo...' value={content} onChange={this.onChangeContentTodo} ref={this.inputRef}/>
          </form>
          <span className='todo-list-item-actions'>
            <button className='btn btn-no-padding btn-remove' onClick={this.toggleEditMode}>
              <img src={remove} alt='Remove todo' width={24} height={24} />
            </button>
          </span>
        </div>
      )
    }

    return (
      <div className={`todo-list-item ${todo.completed ? 'done' : ''}`}>
        <button className='btn btn-no-padding btn-check' onClick={() => onToggleTodo(todo.id)}>
          <img src={todo.completed ? checkGreen : check} alt='Check todo' width={24} height={24} />
        </button>
        <span className='name'>{todo.content}</span>
        <span className='todo-list-item-actions'>
          <button className='btn btn-no-padding btn-edit' onClick={this.toggleEditMode}>
            <img src={edit} alt='Edit todo' width={24} height={24} />
          </button>
          <button className='btn btn-no-padding btn-remove' onClick={() => onRemoveTodo(todo.id)}>
            <img src={remove} alt='Remove todo' width={24} height={24} />
          </button>
        </span>
      </div>
    )
  }
}
