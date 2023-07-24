import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from 'components/input/Input';
import Button from 'components/button/Button';
export default class ContactForm extends Component {
  static propTypes = { submitForm: PropTypes.func };
  static defaultProps = { submitForm: () => {} };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    this.props.submitForm(name, number);
    form.reset();
  }
  render() {
    const { submitForm } = this.props;
    return (
      <form className="form-contact" onSubmit={this.handleSubmit}>
        <Input
          type={'text'}
          name={'name'}
          label={'Name'}
          autoComplete={'off'}
          placeholder={'Name'}
          title={
            "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          }
          pattern={"^[a-zA-ZА-Я]+(([' -][a-zA-ZА-Я ])?[a-zA-ZА-Я]*)*$"}
        />
        <Input
          type={'number'}
          name={'number'}
          label={'Number'}
          placeholder={'Number'}
          autoComplete={'off'}
        />
        <Button type={'submit'} text={'Add Contact'} />
      </form>
    );
  }
}
