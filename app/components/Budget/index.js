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
    console.log(this.state.transactions);
    this.date = new Date();
  }
  getDate() {
    let day = this.date.getDate();
    let month =  this.date.getMonth();
    return Utils.getDateFormatted(day, month);
  }

  render() {
    return (
      <div>
        <h1>{this.getDate()}</h1>
        <div className="listView">
          <DetailView />
        </div>
      </div>
    );
  }
};

export default Budget;
