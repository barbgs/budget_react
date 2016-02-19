import React, { PropTypes } from 'react';
import styles from './styles.scss';

const propTypes = {
  edit: PropTypes.bool.isRequired
}

class ManageTransaction extends React.Component {
  constructor(props) {
    super(props);
  }

  getVisibility() {
    return this.props.edit ? '' : styles.hidden;
  }

  render() {
    return (
      <form className={this.getVisibility()}>
        <input type="number" placeholder="Date"/>
        <input type="text" placeholder="Name"/>
        <input type="text" placeholder="Amount"/>
      </form>
    );
  }
}

ManageTransaction.propTypes = propTypes;
export default ManageTransaction;
