import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ submit = '', text = '', onClick = () => {} }) => {
  return (
    <button type={submit} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  submit: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
