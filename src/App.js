import React, { Component } from 'react'
import Header from './components/Header/Header'
import Total from './components/Total/Total'
import ExpenseBox from './components/ExpenseBox/ExpenseBox'
import './App.css'

class App extends Component {
  state = {
    expenses: [],
    expenseName: '',
    expenseAmount: 0
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
          expenses: [...this.state.expenses, json.expense],
          expenseName: '',
          expenseAmount: 0
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
        <Header />
        <div className="container">
          <Total />
          {
            this.state.expenses.map((expense, index) => (
              <ExpenseBox 
                key={index}
                name={expense.name}
                amount={expense.amount}
                date={expense.date}/>
            ))
          }
          <ExpenseBox
            name="Buku Harry Potter"
            amount={50000}
            date="25/03/2017" />
        </div>
      </div>
    );
  }
}

export default App;
