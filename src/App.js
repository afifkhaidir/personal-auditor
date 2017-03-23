import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    expenses: [],
    expenseName: '',
    expenseAmount: 2
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/expense')
      .then(response => response.json())
      .then(json => {
        this.setState({
          expenses: json
        })
      })
  }

  handleSubmit(event) {
    const data = {
      name: this.state.expenseName,
      amount: this.state.expenseAmount
    }
    const formBody = Object.keys(data)
      .map(key=>encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    }

    fetch('http://localhost:8080/api/expense', request)
      .then(response => response.json())
      .then(json => {
        this.setState({
          expenses: [...this.state.expenses, json.expense]
        })
      })

    event.preventDefault()
  }

  handleNameChange(event) {
    this.setState({ expenseName: event.target.value })
  }

  handleAmountChange(event) {
    this.setState({ expenseAmount: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ul className="App-intro">
          {this.state.expenses.map((expense, index) => <li key={index}>{expense.name}</li>)}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
                 name="name" 
                 value={this.state.expenseName}
                 onChange={this.handleNameChange}/>
          <input type="number" 
                 name="amount" 
                 value={this.state.expenseAmount}
                 onChange={this.handleAmountChange}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default App;
