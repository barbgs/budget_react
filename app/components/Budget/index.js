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

  setEditToFalse(edit) {
    this.transactionKeys.forEach((key)=> {
      edit[key] = false;
    });
    return edit;
  }

  getEditState(info) {
    let edit = true;
    let selectedId = this.state.selected[info.key].id;
    let currentEdit = this.state.edit[info.key];

    /* If clicking what is already selected */
    /* If clicking add again */
    if ((selectedId && selectedId === info.id) ||
      (!selectedId && currentEdit === true && !info.id)) {
      edit = !currentEdit;
    }
    return edit;
  }

  toggleManage(detailKey, transactionId) {
    let newState = {};
    /* this.state cannot be set directly, so new object is created */
    newState.edit = _.assign({}, this.state.edit);
    newState.selected = _.assign({}, this.state.selected);

    let edit = this.getEditState({
      key: detailKey,
      id: transactionId
    });

    /* Check what state to put edit on*/
    newState.selected[detailKey]
    /* If an id is provided , load selected from store */
    if (transactionId) {
      let selected = TransactionStore.getTransactionById({
        detailKey,
        id: transactionId
      })

      /* Set selected state for detailKey set all others to empty,
      also set all detailkeys edit to false to close them */
      this.transactionKeys.forEach((key)=> {
        newState.selected[key] = {};
        newState.edit[key] = false;
      });
      newState.selected[detailKey] = selected;
    } else {
      newState.selected[detailKey] = {}
      newState.edit = this.setEditToFalse(newState.edit);
    }

    /* Set only the current detailkey to true */
    newState.edit[detailKey] = edit;

    this.setState(newState);
  }

  saveTransaction(data) {
    console.log(data);
  }

  onChange() {
    console.log(this.state.selected);
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
            detailKey={key}
            edit={this.state.edit[key]}
            selected={this.state.selected[key]}
            toggleManage={this.toggleManage.bind(this)}
            onChange={this.onChange.bind(this)}
            saveTransaction={this.saveTransaction.bind(this)} />
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
