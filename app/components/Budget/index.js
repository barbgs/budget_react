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
    let edit = !this.state.edit["fixed_expenses"];
    let newState = _.assign({}, this.state.edit);
    newState["fixed_expenses"] = edit;
    this.setState({ edit: newState});
  }

  render() {
    let transactions = [];
    for (var key in this.state.transactions) {
      if (this.state.transactions.hasOwnProperty(key)) {
        transactions.push(
          <DetailView
            key={key}
            detail={this.state.transactions[key]}
            edit={this.state.edit[key]}
            toggleEdit={this.toggleEdit.bind(this)} />
        )
      }
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
