'use strict';
import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Icon from '../../common/Icon';

const propTypes = {
  detail: PropTypes.object.isRequired,
  toggleManage: PropTypes.func.isRequired
}

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.today = new Date().getDate();
  }

  isDue() {
    return this.props.detail.date < this.today
  }

  toggleManage() {
    this.props.toggleManage(this.props.detailKey, this.props.detail.id);
  }

  render() {
    return (
      <li className={this.isDue() ? styles.due : false}
        onDoubleClick={this.toggleManage.bind(this)}>
        <span className={styles.date}>{this.props.detail.date}</span>
        <span className={styles.name}>{this.props.detail.name}</span>
        <span className={styles.amount}>{this.props.detail.amount}</span>
      </li>
    );
  }
}

Transaction.propTypes = propTypes;
export default Transaction;
