import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from 'components/input/Input';
export default class Filter extends Component {
  static propTypes = { onChnage: PropTypes.func };
  static defaultProps = { onChange: () => {} };

  render() {
    const { onChange } = this.props;
    return (
      <Input
        type={'text'}
        name={'filter'}
        label={'Search Contact'}
        autoComplete={'off'}
        placeholder={'Search'}
        onChange={e => {
          onChange(e);
        }}
      />
    );
  }
}
