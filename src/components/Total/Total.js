import React, { Component } from 'react'
import './Total.css'

class Total extends Component {
  static propTypes = {
    total: React.PropTypes.number
  }

  render() {
    const total = this.props.total || 0
    return (
      <div className="total">
        Total Pengeluaran: <span className="total__expense">{'Rp ' + total}</span>
      </div>
    )
  }
}

export default Total