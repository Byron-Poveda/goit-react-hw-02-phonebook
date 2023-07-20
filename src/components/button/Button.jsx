import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  static propTypes = {
    submit: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    submit: '',
    text: '',
    onClick: () => {},
  };

  render() {
    const { submit, text, onClick } = this.props;
    return (
      <button type={submit} onClick={onClick}>
        {text}
      </button>
    );
  }
}
