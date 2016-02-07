'use strict';

import React, { PropTypes } from 'react';
import DetailItem from './DetailItem'

const propTypes = {
  detail: PropTypes.object.isRequired
};

class DetailView extends React.Component {
  constructor() {
    super();
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
      <ul>
        <li>
          <span>{this.props.detail.name}</span>
          <span>{this.props.detail.amount}</span>
          <span>+</span>
          <ul>{details}</ul>
        </li>
      </ul>
    );
  }
}

DetailView.propTypes = propTypes;
export default DetailView;
