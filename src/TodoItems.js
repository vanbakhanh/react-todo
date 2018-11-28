import React, { Component } from 'react';

class TodoItems extends Component {
  createTask = item => {
    return (
      <li key={item.key}>
        <p onClick={() => this.props.editItem(item)}>{item.text}</p>
        <button onClick={() => this.props.deleteItem(item.key)}>x</button>
      </li>
    )
  }

  render() {
    const todoEntries = this.props.entries
    const listItems = todoEntries.map(this.createTask)

    return (
      <ul className="theList">{listItems}</ul>
    )
  }
}

export default TodoItems