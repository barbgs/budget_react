'use strict';

import React from 'react';
import Utils from '../../utils';
import DetailView from '../common/DetailView';
import TransactionStore from '../../stores/transactionStore';

class Budget extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: TransactionStore.getTransactions()
    };
    this.date = new Date();
    console.log(this.state.transactions);
  }

  getDate() {
    let day = this.date.getDate();
    let month =  this.date.getMonth();
    return Utils.getDateFormatted(day, month);
  }

  render() {
    let transactions = [];
    for (var key in this.state.transactions) {
      if (this.state.transactions.hasOwnProperty(key)) {
        transactions.push(<DetailView key={key} detail={this.state.transactions[key]} />)
      }
    }

    return (
      <div>
        <h3>{this.getDate()}</h3>
        <div className="listView">
          {transactions}
        </div>
      </div>
    );
  }
};

export default Budget;
