'use strict';

import React, { PropTypes } from 'react';
import DetailItem from './DetailItem'
import styles from './styles.scss';
import classNames from 'classNames';

const propTypes = {
  detail: PropTypes.object.isRequired
};

class DetailView extends React.Component {
  constructor(props) {
    super(props);
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
        <h3 className={styles.title}>
          <span className={classNames(styles.name, styles[this.props.detail.type])}>{this.props.detail.name}</span>
          <span className={styles.amount}>{this.props.detail.amount}</span>
        </h3>
        <ul className={styles.details}>{details}</ul>
      </div>
    );
  }
}

DetailView.propTypes = propTypes;
export default DetailView;
