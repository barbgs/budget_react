import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired
};

class Icon extends React.Component {
  getClass() {
    return `fa fa-fw fa-${this.props.name}`;
  }
  render() {

    return (
      <i className={this.getClass()}></i>
    );
  }
}

Icon.propTypes = propTypes;
export default Icon;
