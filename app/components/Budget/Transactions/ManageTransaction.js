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

  componentDidUpdate() {
    if (this.props.edit) {
      this.dateInput.focus();
    }
  }

  getVisibility() {
    return this.props.edit ? '' : styles.hidden;
  }

  toggleManage() {
    this.props.toggleManage(this.props.detailKey);
  }

  handleKey(e) {
    switch (e.keyCode) {
      case 27:
        this.toggleManage(this.props.detailKey);
        break;
      default:
        break;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSave();
  }

  render() {
    return (
      <form
        className={classNames(this.getVisibility(), styles.manage)}
        onKeyDown={this.handleKey.bind(this)}
        onSubmit={this.onSubmit.bind(this)} >
        <input
          className={styles.date}
          type="number"
          name="date"
          placeholder="Date"
          value={this.props.selected.date}
          onChange={this.props.onChange}
          ref={(ref) => this.dateInput = ref} />
        <input
          className={styles.name}
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.props.onChange}
          value={this.props.selected.name} />
        <input
          className={styles.amount}
          type="text"
          name="amount"
          placeholder="Amount"
          onChange={this.props.onChange}
          value={this.props.selected.amount} />
        <input type="submit" value="Save" />
      </form>
    );
  }
}

ManageTransaction.propTypes = propTypes;
export default ManageTransaction;
