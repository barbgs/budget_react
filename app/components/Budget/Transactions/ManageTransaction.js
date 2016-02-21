'use strict';
import React, { PropTypes } from 'react';
import styles from './styles.scss';
import classNames from 'classNames';

const propTypes = {
  edit: PropTypes.bool.isRequired
}

class ManageTransaction extends React.Component {
  constructor(props) {
    super(props);
  }

  getVisibility() {
    return this.props.edit ? '' : styles.hidden;
  }

  render() {
    return (
      <form className={classNames(this.getVisibility(), styles.manage)}>
        <input
          className={styles.date}
          type="number"
          placeholder="Date"
          value={this.props.selected.date} />
        <input
          className={styles.name}
          type="text"
          placeholder="Name"
          value={this.props.selected.name} />
        <input
          className={styles.amount}
          type="text"
          placeholder="Amount"
           value={this.props.selected.amount} />
      </form>
    );
  }
}

ManageTransaction.propTypes = propTypes;
export default ManageTransaction;
