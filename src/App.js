import React, { Component } from 'react'
import Header from './components/Header/Header'
import Total from './components/Total/Total'
import ExpenseBox from './components/ExpenseBox/ExpenseBox'
import Form from './components/Form/Form'
import './App.css'

class App extends Component {
  state = {
    expenses: [],
    expenseName: '',
    expenseAmount: 0,
    total: 0
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
  }

  componentWillMount() {
    fetch('http://localhost:8080/api/expense')
      .then(response => response.json())
      .then(json => {
        var total = 0
        for(var i = 0; i < json.length; i++) {
          total += json[i].amount
        }
        this.setState({
          expenses: json,
          total
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
          expenses: [json.expense, ...this.state.expenses],
          expenseName: '',
          expenseAmount: 0,
          total: this.state.total + json.expense.amount
        })
      })

    event.preventDefault()
  }

  handleNameChange(event) {
    this.setState({ expenseName: event.target.value })
  }

  handleAmountChange(event) {
    event.target.value ?
      this.setState({ expenseAmount: parseInt(event.target.value, 10) }) :
      this.setState({ expenseAmount: 0 })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Form
            onSubmit={this.handleSubmit}
            name={this.state.expenseName}
            amount={this.state.expenseAmount}
            onNameChange={this.handleNameChange}
            onAmountChange={this.handleAmountChange} />
          <Total total={this.state.total}/>

          {
            this.state.expenses.map((expense, index) => (
              <ExpenseBox 
                key={index}
                name={expense.name}
                amount={expense.amount}
                date={expense.date}/>
            ))
          }

        </div>
      </div>
    );
  }
}

export default App;
