'use strict';
import React from 'react';
import Utils from '../../utils';
import TransactionDetail from './Transactions';
import styles from './styles.scss';
import TransactionStore from '../../stores/transactionStore';
import ManageTransaction from './Transactions/ManageTransaction';
import TransactionActions from '../../actions/transactionActions';

class Budget extends React.Component {
  constructor() {
    super();
    this.date = new Date();
    this.state = {
      transactions: [],
      edit: {},
      selected: {}
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
    this.setEditStateFromTransactions(transactions);
    this.setState({ transactions });
  }

  setEditStateFromTransactions(transactions) {
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

  toggleManage(detailKey, transactionId) {
    let newState = {};
    let edit = !this.state.edit[detailKey];
    let selected = TransactionStore.getTransactionById(transactionId)

    if (selected) {

      newState.selected = selected
    }
    newState.edit = _.assign({}, this.state.edit);
    newState.edit[detailKey] = edit;

    this.setState(newState);
  }

  render() {
    let transactions = [];
    let count = 0;
    for (var key in this.state.transactions) {
      if (this.state.transactions.hasOwnProperty(key)) {
        transactions.push(
          <div key={key}>
            <TransactionDetail
              detailKey={key}
              detail={this.state.transactions[key]}
              edit={this.state.edit[key]}
              toggleManage={this.toggleManage.bind(this)} />
            <ManageTransaction
              edit={this.state.edit[key]}
              selected={this.state.selected} />
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
