'use strict';

import React from 'react';
import DetailItem from './DetailItem'

class DetailView extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ul>
        <li>
          <span>Name</span>
          <span>Amount</span>
          <span>+</span>
        </li>
        <DetailItem />
      </ul>
    );
  }
}

export default DetailView;
