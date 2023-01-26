import React, { Component } from 'react';
import Form from './components/Form/Form';
import ContactList from 'components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import warningMessage from './utils/warningMessage';

import shortid from 'shortid';

import css from './App.module.css';
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (
      parsedContacts?.length //contacts && contacts.lenght
    ) {
      console.log(parsedContacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (this.state.contacts !== prevState.contacts) {
      console.log('update');
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  addContact = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    const names = this.state.contacts.map(contact =>
      contact.name.toLocaleLowerCase()
    );
    const normalizedNewContactName = name.toLocaleLowerCase();

    if (names.indexOf(normalizedNewContactName) >= 0) {
      warningMessage(name);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  cangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    console.log('render');
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContactList = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={css.phonebook}>
        <h1 className={css.phonebook__title}> Phonebook</h1>
        <Form onSubmit={this.addContact} />

        <h2 className={css.phonebook__subtitle}>Contacts</h2>
        <Filter value={filter} onChange={this.cangeFilter} />
        <ContactList
          contacts={filteredContactList}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
