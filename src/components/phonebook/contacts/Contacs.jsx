import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'components/button/Button';
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
        <h3>{name ? `${name} - ${number}` : null}</h3>
        <Button
          type={'button'}
          text={'Delete'}
        />
      </div>
    );
  }
}
