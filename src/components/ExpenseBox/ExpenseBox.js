import React, { Component } from 'react'
import './ExpenseBox.css'

class ExpenseBox extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    amount: React.PropTypes.number,
    date: React.PropTypes.string
  }

  render() {
    return (
      <div className="expense-box">
        <div className="expense-name">
          <span className="expense-name__text">{this.props.name}</span>
        </div>
        <div className="expense-detail clearfix">
          <span className="expense-detail__amount">{'Rp ' + this.props.amount}</span>
          <span className="expense-detail__date">{this.props.date}</span>
        </div>
      </div>
    )
  }
}

export default ExpenseBox