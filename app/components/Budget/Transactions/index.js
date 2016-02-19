'use strict';

import React, { PropTypes } from 'react';
import Transaction from './Transaction'
import styles from './styles.scss';
import classNames from 'classNames';
import ManageTransaction from './ManageTransaction';

const propTypes = {
  detail: PropTypes.object.isRequired
};

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let details = null;
    if(this.props.detail.detail) {
      details = this.props.detail.detail.map((detail) => {
        return (
          <Transaction
            key={detail.id}
            detail={detail}
            toggleEdit={this.props.toggleEdit} />
        )
      });
    }

    return (
      <div>
        <div className={styles.root}>
          <h3 className={styles.title}>
            <span className={classNames(styles.name, styles[this.props.detail.type])}>{this.props.detail.name}</span>
            <span className={styles.amount}>{this.props.detail.amount}</span>
          </h3>
          <ul className={styles.details}>{details}</ul>
        </div>
        <ManageTransaction
          edit={this.props.edit} />
      </div>
    );
  }
}

TransactionList.propTypes = propTypes;
export default TransactionList;