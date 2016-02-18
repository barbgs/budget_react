'use strict';

import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Icon from '../Icon';

const propTypes = {
  detail: PropTypes.object.isRequired,
  toggleEdit: PropTypes.func.isRequired
}

class DetailItem extends React.Component {
  constructor(props) {
    super(props);
    this.today = new Date().getDate();
  }

  isDue() {
    return this.props.detail.date < this.today
  }

  toggleEdit() {
    /*let element = e.target;
    if (element.tagName !== 'LI') {
      element = element.parentNode;
    }*/
    this.props.toggleEdit(this.props.detail.id);
  }

  render() {
    return (
      <li className={this.isDue() ? styles.due : false}
        onDoubleClick={this.toggleEdit.bind(this)}>
        <span className={styles.date}>{this.props.detail.date}</span>
        <span className={styles.name}>{this.props.detail.name}</span>
        <span className={styles.amount}>{this.props.detail.amount}</span>
      </li>
    );
  }
}

DetailItem.propTypes = propTypes;
export default DetailItem;
