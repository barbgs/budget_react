'use strict';
import React, { PropTypes, Component } from 'react';
import Transaction from './Transaction';

const propTypes = {
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

class TransactionList extends Component {
  constructor(props) {
    super(props);
  }

  renderTransactions() {
    let transactions = [];
    this.props.data.items.forEach((transaction) => {
      transactions.push((
        <Transaction
          key={transaction.id}
          data={transaction}
          handleChange={this.props.handleChange}
          editing={this.props.editing === transaction.id}
          onEdit={this.props.onEdit} />
      ));
    });
    return transactions;
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>{this.props.data.name}</th>
            <th>{this.props.data.amount}</th>
            <th></th>
          </tr>
          {this.renderTransactions()}
        </tbody>
      </table>
    );
  }
}

TransactionList.propTypes = propTypes;
export default TransactionList;
