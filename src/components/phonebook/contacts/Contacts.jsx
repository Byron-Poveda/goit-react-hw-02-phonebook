import PropTypes from 'prop-types';
import React, { Component } from 'react';
export default class Contacs extends Component {
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
    id: PropTypes.string,
  };
  static defaultProps = {
    name: '',
    number: null,
    id: '',
  };

  render() {
    const { name, number } = this.props;
    return (
      <div>
        <h3>{`${name}: ${number}`}</h3>
      </div>
    );
  }
}
