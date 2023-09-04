import React from 'react'
import PropTypes from 'prop-types'
import Input from 'components/input/Input';

const Filter=({onChange=()=>{}})=> {
  return (
    <Input
        type={'text'}
        name={'filter'}
        label={'Search Contact'}
        autoComplete={'off'}
        placeholder={'Search'}
        onChange={e => {
          onChange(e.target.value);
        }}
      />
  )
}

Filter.propTypes = { onChnage: PropTypes.func };

export default Filter




















