import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/input/Input';
import Button from 'components/button/Button';
import styled from 'styled-components';
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  & Button {
    width: 100px;
  }
`;
const ContactForm = ({ submitForm = () => {} }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    submitForm(name, number);
    form.reset();
  };
  return (
    <Form className="form-contact" onSubmit={handleSubmit}>
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
    </Form>
  );
};

ContactForm.propTypes = { submitForm: PropTypes.func };

export default ContactForm;
