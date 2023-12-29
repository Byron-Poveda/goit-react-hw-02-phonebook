import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';

const Button = ({ type = '', isDisabled = false, classButton = '', classText = '', onClick = () => {}, children, loading }) => {
  return (
    <button 
      type={type} 
      disabled={isDisabled}
      onClick={onClick}
      className={`${classButton ? classButton : ''} disabled:!translate-y-0 disabled:!bg-phonebook-indigo disabled:opacity-[.7] h-[40px] flex justify-center items-center w-full bg-phonebook-indigo rounded-lg hover:bg-phonebook-indigo-dark hover:-translate-y-1 transition-all duration-500`}
    >
      {loading ? 
      <Loader variant='circle' width='40px' height='40px'/>:
      <span className={`${classText} text-white font-semibold`}>{ children }</span>
      }
    </button>
  );
};

Button.propTypes = {
  submit: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  text: PropTypes.string,
  classButton: PropTypes.string,
  classText: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
