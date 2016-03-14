'use strict';
import React, { Component } from 'react';
import TransactionList from './TransactionList';
import TransactionStore from '../../stores/transactionStore';

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      editing: null
    };
  }

  componentWillMount() {
    TransactionStore.addChangeListener(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    TransactionStore.removeChangeListener(this.onStoreChange.bind(this));
  }

  onStoreChange() {
    let transactions = TransactionStore.getTransactions();
    this.setState({ transactions });
  }

  onEdit(transaction) {
    this.setState({ editing: transaction.id});
  }

  handleChange() {
    console.log('change');
  }

  renderTransactionLists() {
    let transactionLists = [];
    Object.keys(this.state.transactions).forEach((listId) => {
      transactionLists.push((
        <TransactionList
          key={listId}
          listId={listId}
          editing={this.state.editing}
          handleChange={this.handleChange}
          onEdit={this.onEdit.bind(this)}
          data={this.state.transactions[listId]} />
      ));
    });
    return transactionLists;
  }

  render() {
    return (
      <div>
        {this.renderTransactionLists()}
      </div>
    );
  }
}

export default Transactions;
