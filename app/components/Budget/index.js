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
    this.transactionKeys = [];
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
    let transactions = TransactionStore.getTransactions();
    this.transactionKeys = Object.keys(transactions);
    this.setEditSelectedInitialState(transactions);
    this.setState({ transactions });
  }

  /* Each transaction key has an edit and selected variable, they are set here */
  setEditSelectedInitialState(transactions) {
    let edit = _.assign({}, this.state.edit);
    let selected = _.assign({}, this.state.selected);

    this.transactionKeys.forEach((key) => {
      /* By default set new transactions keys edit state to false */
      if (!edit[key]){
        edit[key] = false;
      }
      /* By default set new transactions keys selected to empty */
      if (!selected[key]){
        selected[key] = {};
      }
    });

    this.setState({
      edit,
      selected
    });
  }

  getDate() {
    let day = this.date.getDate();
    let month =  this.date.getMonth();
    return Utils.getDateFormatted(day, month);
  }

  toggleManage(detailKey, transactionId) {
    let newState = {};
    let edit = transactionId ? true : !this.state.edit[detailKey];

    /* this.state cannot be set directly, so new object is created
     */
    newState.edit = _.assign({}, this.state.edit);


    /* If an id is provided , load selected from store */
    if (transactionId) {
      let selected = TransactionStore.getTransactionById({
        detailKey,
        id: transactionId
      })
      /* Set selected state for detailKey set all others to empty,
      also set all detailkeys edit to false to close them */

      newState.selected = _.assign({}, newState.selected);
      this.transactionKeys.forEach((key)=> {
        newState.selected[key] = {};
        newState.edit[key] = false;
      });
      newState.selected[detailKey] = selected;
    }

    /* Set only the current detailkey to true */
    newState.edit[detailKey] = edit;
    this.setState(newState);
  }

  render() {
    let transactions = [];
    Object.keys(this.state.transactions).forEach((key) => {
      transactions.push(
        <div key={key}>
          <TransactionDetail
            detailKey={key}
            detail={this.state.transactions[key]}
            edit={this.state.edit[key]}
            toggleManage={this.toggleManage.bind(this)} />
          <ManageTransaction
            edit={this.state.edit[key]}
            selected={this.state.selected[key]} />
        </div>
      );
    });

    return (
      <div>
        <h3 className={styles.date}>{this.getDate()}</h3>
        {transactions}
      </div>
    );
  }
};

export default Budget;
