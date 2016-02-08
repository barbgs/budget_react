'use strict';

import React, { PropTypes } from 'react';
import DetailItem from './DetailItem'
import styles from './styles.scss';

const propTypes = {
  detail: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired
};

class DetailView extends React.Component {
  constructor(props) {
    super(props);
  }

  setExpandedClass(){
    return this.props.expanded ? `${styles.details} ${styles.expanded}` : styles.details
  }

  render() {
    let details = null;
    if(this.props.detail.detail) {
      details = this.props.detail.detail.map((detail) => {
        return (
          <DetailItem key={detail.id} detail={detail} />
        )
      });
    }

    return (
      <div className={styles.root}>
        <div className={styles.parent} onClick={this.props.onClick}>
          <span className={styles.name}>{this.props.detail.name}</span>
          <span className={styles.amount}>{this.props.detail.amount}</span>
          <span>+</span>
        </div>
        <ul className={this.setExpandedClass()}>{details}</ul>
      </div>
    );
  }
}

DetailView.propTypes = propTypes;
export default DetailView;
