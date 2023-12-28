import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Input = ({
  id = 'W-' + Date.now() + Math.floor(Math.random() * 100),
  modelValue = '',
  required = false,
  disabled = false,
  tooltipText = '',
  children = null,
  type = 'text',
  autoComplete = '',
  classWrapper = '',
  classInput = '',
  error = false,
  onChange = ()=>{},
  onFocus = ()=>{},
  placeholder = "",
  variant = '',
}) => {

  return (
    <div className="relative w-full group">
      <div className={`${classWrapper ? classWrapper : ''} ${variant === 'white' ? 'border border-[#ffffff65]' : ''} flex items-center gap-[14px] border-2 py-2 px-3 rounded-lg items-center`}>
        <span className={`text-[#9ca3af] ${ variant === 'white' ? '!text-white' : '' }`}>{children}</span>
        <input
          id={id}
          className={`w-full text-sm bg-transparent ${variant === 'white' ? '!text-white' : ''} ${ error ? 'border-red-400': '' } appearance-none focus:outline-none focus:ring-0 placeholder:text-transparent peer ${classInput ? classInput : ''}`}
          type={type}
          value={error ? '' : modelValue}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onInput={onChange}
          onFocus={onFocus}
        />
      <label
        id={id}
        className={`${variant === 'white' ? '!text-white' : ''} absolute text-sm duration-300 transform -translate-y-[22px] scale-90 origin-[0] peer-focus:font-medium ${children ? 'peer-focus:left-0' : ''} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-[22px] ${children ? 'peer-focus:translate-x-[12px]' : ''} z-[2] pointer-events-none top-[9px] text-[#9ca3af] cursor-text ${children ? 'left-[38px]' : ''} ${modelValue ? 'left-[12px] font-medium scale-75' : ''}`}
      >
        { placeholder } <span>{required ? '*' : ''}</span>
      </label>
      </div>
      {tooltipText && <div className="absolute mt-[2px] ml-[10px] flex gap-[10px] items-center">
        <FontAwesomeIcon icon={faCircleInfo} className='text-[11px] text-red-600'/>
        <span className="text-[11px] text-red-600">{ tooltipText }</span>
      </div>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  modelValue: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  classWrapper: PropTypes.string,
  classInput: PropTypes.string,
  variant: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
