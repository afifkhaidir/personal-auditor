import React, { Component } from 'react'
import './Form.css'

class Form extends Component {
  static propTypes = {
    onSubmit: React.PropTypes.func,
    name: React.PropTypes.string,
    amount: React.PropTypes.number,
    onNameChange: React.PropTypes.func,
    onAmountChange: React.PropTypes.func
  }

  render() {
    return (
      <form className="audit-form" onSubmit={this.props.onSubmit}>
        <div className="form-group">
          <label>Expense</label>
          <input 
            type="text" 
            className="form-control" 
            value={this.props.name}
            onChange={this.props.onNameChange} />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input 
            type="number" 
            className="form-control" 
            value={this.props.amount}
            onChange={this.props.onAmountChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default Form