import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    expenses: []
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
      </div>
    );
  }
}

export default App;
