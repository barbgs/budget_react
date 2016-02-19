'use strict';

import React from 'react';
import Utils from '../../utils';
import TransactionDetail from './Transactions';
import styles from './styles.scss';
import TransactionStore from '../../stores/transactionStore';
import ManageTransaction from './Transactions/ManageTransaction';

class Budget extends React.Component {
  constructor() {
    super();
    this.date = new Date();
    this.state = {
      transactions: [],
      edit: {}
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
    this.setEditState(transactions);
    this.setState({ transactions });
  }

  setEditState(transactions) {
    let edit = {};
    _.assign(edit, this.state.edit);

    for (var key in transactions) {
      if (transactions.hasOwnProperty(key)) {
        if (!edit[key]){
          edit[key] = false;
        }
      }
    }
    this.setState({ edit });
  }

  getDate() {
    let day = this.date.getDate();
    let month =  this.date.getMonth();
    return Utils.getDateFormatted(day, month);
  }

  toggleEdit(id) {
    let edit = !this.state.edit[id];
    let newState = _.assign({}, this.state.edit);
    newState[id] = edit;
    this.setState({ edit: newState});
  }

  render() {
    let transactions = [];
    let count = 0;
    for (var key in this.state.transactions) {
      if (this.state.transactions.hasOwnProperty(key)) {
        transactions.push(
          <div key={key}>
            <TransactionDetail
              detail={this.state.transactions[key]}
              toggleEdit={this.toggleEdit.bind(this)} />
            <ManageTransaction
              edit={this.state.edit[key]} />
          </div>
        )
      }
      count++;
    }

    return (
      <div>
        <h3 className={styles.date}>{this.getDate()}</h3>
        {transactions}
      </div>
    );
  }
};

export default Budget;
