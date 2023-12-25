import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';

const Button = ({ type = '', isDisabled = '', classButton = '', classText = '', onClick = () => {}, children, loading }) => {
  return (
    <button 
      type={type} 
      disabled={isDisabled}
      className={`${classButton ? classButton : ''} disabled:opacity-[.7] h-[40px] flex justify-center items-center w-full bg-phonebook-indigo rounded-lg hover:bg-phonebook-indigo-dark hover:-translate-y-1 transition-all duration-500`}
    >
      {loading ? 
      <Loader width='40px' height='40px'/>:
      <span className={`${classText} text-white font-semibold`}>{ children }</span>
      }
    </button>
  );
};

Button.propTypes = {
  submit: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
