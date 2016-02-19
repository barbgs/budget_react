'use strict';
import React, { PropTypes } from 'react';
import styles from './styles.scss';

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
      <form className={this.getVisibility()}>
        <input
          type="number"
          placeholder="Date"
          value={this.props.selected.date} />
        <input
          type="text"
          placeholder="Name"
          value={this.props.selected.name} />
        <input
          type="text"
          placeholder="Amount"
           value={this.props.selected.amount} />
      </form>
    );
  }
}

ManageTransaction.propTypes = propTypes;
export default ManageTransaction;
