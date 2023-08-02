import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

const Input = ({
  type = '',
  name = '',
  autoComplete = '',
  pattern = '',
  title = '',
  label = '',
  onChange = ()=>{},
  placeholder = "",
}) => {
  return (
    <label className="label-input">
      {label}
      <input
        className="input"
        type={type}
        name={name}
        autoComplete={autoComplete ? autoComplete : null}
        validate={pattern ? pattern : null}
        title={title ? title : null}
        required
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
  lable: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  onBlur: PropTypes.bool,
};

export default Input;
