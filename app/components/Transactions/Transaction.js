'use strict';
import React, { PropTypes, Component } from 'react';
import classNames from 'classNames';
import styles from './styles.scss';

const propTypes = {
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

class Transaction extends Component {
  constructor(props) {
    super(props);
  }

  onEdit() {
    this.props.onEdit(this.props.data);
  }

  render() {
    return (
        <tr
          className={classNames({
            [styles.editing]: this.props.editing,
            [styles.transaction]: true
          })}
          onDoubleClick={this.onEdit.bind(this)} >
          <td>
            <span>{this.props.data.date}</span>
            <input
              type="text"
              placeholder="Date"
              onChange={this.props.handleChange}
              value={this.props.data.date} />
          </td>
          <td>
            <span>{this.props.data.name}</span>
            <input
              type="text"
              placeholder="Name"
              onChange={this.props.handleChange}
              value={this.props.data.name} />
          </td>
          <td>
            <span>{this.props.data.amount}</span>
            <input
              type="text"
              placeholder="Amount"
              onChange={this.props.handleChange}
              value={this.props.data.amount} />
          </td>
          <td>Save</td>
        </tr>
    );
  }
}

Transaction.propTypes = propTypes;
export default Transaction;
