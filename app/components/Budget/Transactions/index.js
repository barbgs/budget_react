'use strict';
import React, { PropTypes } from 'react';
import Transaction from './Transaction'
import styles from './styles.scss';
import classNames from 'classNames';

const propTypes = {
  detail: PropTypes.object.isRequired
};

class TransactionDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleManage() {
    this.props.toggleManage(this.props.detailKey);
  }

  render() {
    let details = null;
    if(this.props.detail.detail) {
      details = this.props.detail.detail.map((detail) => {
        return (
          <Transaction
            key={detail.id}
            detail={detail}
            edit={this.props.edit}
            toggleManage={this.props.toggleManage}
            detailKey={this.props.detailKey} />
        )
      });
    }

    return (
      <div>
        <div className={styles.root}>
          <h3 className={styles.title} onDoubleClick={this.toggleManage.bind(this)}>
            <span className={classNames(styles.name, styles[this.props.detail.type])}>
              {this.props.detail.name}
            </span>
            <span className={styles.amount}>{this.props.detail.amount}</span>
            <span className={styles.add} onClick={this.toggleManage.bind(this)}>
              +
            </span>
          </h3>
          <ul className={styles.details}>{details}</ul>
        </div>
      </div>
    );
  }
}

TransactionDetail.propTypes = propTypes;
export default TransactionDetail;
