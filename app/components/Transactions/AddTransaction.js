'use strict';
import React, { Component } from 'react';
import TransactionActions from '../../actions/transactionActions';
import _ from 'lodash';

class AddTransaction extends Component {
  constructor() {
    super();
    this.state = {
      transaction: {
        type: 'expense'
      }
    }
  }

  onSubmit(evt) {
    evt.preventDefault();
    console.log('validate data here');
    console.log('save', this.state.transaction);
    TransactionActions.saveTransaction(this.state.transaction);
  }

  onChange(evt) {
    var field = evt.target.name,
        value = evt.target.value;

    var transaction = _.assign({}, this.state.transaction);
    transaction[field]= value;
    this.setState({transaction});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h4>Add Income/Expense</h4>
        <input
          type="text"
          placeholder="Date"
          name="date"
          onChange={this.onChange.bind(this)} />
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={this.onChange.bind(this)} />
        <input
          type="text"
          placeholder="Amount"
          name="amount"
          onChange={this.onChange.bind(this)} />

        <input
          id="radio-expense"
          type="radio"
          name="type"
          value="expense"
          defaultChecked="checked"
          onClick={this.onChange.bind(this)} />
        <label htmlFor="radio-expense">Expense</label>
        <input
          id="radio-income"
          type="radio"
          name="type"
          value="income"
          onClick={this.onChange.bind(this)} />
        <label htmlFor="radio-income">Income</label>

        <input
          type="checkbox"
          name="frequency"
          value="recurring"
          onClick={this.onChange.bind(this)} />
        <label htmlFor="checkbox-frequency">Recurrent Monthly</label>

        <input type="submit" value="Save" />
      </form>
    );
  }
}

export default AddTransaction;
