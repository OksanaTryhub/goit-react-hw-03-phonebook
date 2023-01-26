import React, { Component } from 'react';
import Form from './components/Form/Form';
import ContactList from 'components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import warningMessage from './utils/warningMessage';

import shortid from 'shortid';

import css from './App.module.css';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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
