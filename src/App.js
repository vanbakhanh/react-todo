import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoItems from './TodoItems';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: JSON.parse(localStorage.getItem('myData')),
      currentItem: { text: '', key: '' }
    }
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  handleInput = e => {
    const itemText = e.target.value
    this.setState({
      currentItem: { text: itemText, key: Date.now() }
    })
  }

  addItem = e => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      const newItems = [...this.state.items, newItem]
      this.setState({
        items: newItems,
        currentItem: { text: '', key: '' }
      })
      localStorage.setItem('myData', JSON.stringify(newItems))
    }
  }

  editItem = item => {
    this.setState({ currentItem: item })
    this.deleteItem(item.key)
  }

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems,
    })
    localStorage.setItem('myData', JSON.stringify(filteredItems))
  }

  render() {
    return (
      <div className="App">
        <TodoList
          addItem={this.addItem}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        />
        <TodoItems
          entries={this.state.items}
          deleteItem={this.deleteItem}
          editItem={this.editItem}
        />
      </div>
    );
  }
}

export default App;
