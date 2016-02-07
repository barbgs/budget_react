'use strict';

import React, { PropTypes } from 'react';

const propTypes = {
  detail: PropTypes.object.isRequired
}

class DetailItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <li>
        <span>{this.props.detail.name}</span>
        <span>{this.props.detail.amount}</span>
      </li>
    );
  }
}

DetailItem.propTypes = propTypes;
export default DetailItem;
