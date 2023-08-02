import React from 'react';
import PropTypes from 'prop-types';

const Contacts = ({ name = '', number = null }) => {
  return (
    <div>
      <h3>{`${name}: ${number}`}</h3>
    </div>
  );
};

Contacts.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  id: PropTypes.string,
};

export default Contacts;
