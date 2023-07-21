import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './input.css';
export default class Input extends Component {
  static propTypes = {
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
  static defaultProps = {
    type: '',
    name: '',
    autoComplete: '',
    pattern: '',
    title: '',
    label: '',
    placeholder: '',
    onChange: () => {},
  };
  // constructor(props) {
  //   super(props);

  // }
  render() {
    const {
      type,
      name,
      autoComplete,
      pattern,
      title,
      label,
      onChange,
      placeholder,
    } = this.props;
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
  }
}
