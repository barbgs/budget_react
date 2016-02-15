'use strict';

import React from 'react';
import Utils from '../../utils';
import DetailView from '../common/DetailView';
import styles from './styles.scss';
import TransactionStore from '../../stores/transactionStore';

class Budget extends React.Component {
  constructor() {
    super();
    this.date = new Date();
    this.state = {
      transactions: []
    };
  }

  componentWillMount() {
    TransactionStore.addChangeListener(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    TransactionStore.removeChangeListener(this.onStoreChange.bind(this));
  }

  onStoreChange() {
    let transactions = TransactionStore.getTransactions()
    this.setState({ transactions });
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
        transactions.push(<DetailView
          key={key}
          detail={this.state.transactions[key]} />)
      }
    }

    return (
      <div>
        <h3 className={styles.date}>{this.getDate()}</h3>
        <div>
          {transactions}
        </div>
      </div>
    );
  }
};

export default Budget;
