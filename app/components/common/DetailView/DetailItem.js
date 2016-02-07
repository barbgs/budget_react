'use strict';

import React from 'react';

class DetailItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <li>
        <span>Name</span>
        <span>Amount</span>
      </li>
    );
  }
}

export default DetailItem;
