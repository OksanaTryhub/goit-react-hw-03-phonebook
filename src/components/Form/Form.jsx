import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputCange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.contactForm} onSubmit={this.handleSubmit}>
        <label className={css.contactForm__label}>
          Name
          <input
            className={css.contactForm__input}
            type="text"
            name="name"
            autoComplete="off"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleInputCange}
          />
        </label>
        <label className={css.contactForm__label}>
          Number
          <input
            className={css.contactForm__input}
            type="tel"
            name="number"
            autoComplete="off"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInputCange}
          />
        </label>
        <button type="submit" className={css.contactForm__btn}>
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
