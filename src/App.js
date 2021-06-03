import React, { useState, useEffect } from "react";
import "./App.css";
import DisplayContacts from "./components/DisplayContacts";
import ContactForm from "./components/ContactForm";
import SearchContacts from "./components/SearchContacts";
import contactsServices from "./services/contactsServices";
import Notifications from "./components/Notifications";

function App() {
  // state management
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    contactsServices.getAll().then((res) => {
      setContacts(res);
    });
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState({
    notificationMessage: null,
    notificationClass: null,
  });

  // event handlers
  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchResult = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const numberInputHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const nameInputHandler = (e) => {
    setNewName(e.target.value);
  };

  const addContactHandler = (e) => {
    e.preventDefault();

    const contactExistsWithSameNumber = contacts.find(
      (contact) =>
        contact.name.toLowerCase() === newName.toLowerCase() &&
        contact.number === newNumber
    );

    const contactExistsWithDifferentNumber = contacts.find(
      (contact) =>
        contact.name.toLowerCase() === newName.toLowerCase() &&
        contact.number !== newNumber
    );

    if (contactExistsWithSameNumber !== undefined) {
      return alert(`${newName} is already added to the phonebook`);
    } else if (contactExistsWithDifferentNumber !== undefined) {
      let contactToUpdate = contacts.find(
        (contact) => contact.name.toLowerCase() === newName.toLowerCase()
      );

      let confirmationToUpdate = window.confirm(
        `${contactToUpdate.name} is already added to the phonebook, replace the old number with a new one?`
      );

      if (confirmationToUpdate) {
        contactsServices
          .updateContact(contactToUpdate.id, {
            name: newName,
            number: newNumber,
          })
          .then((res) => {
            contacts.map((contact) => {
              return contact.id !== contactToUpdate.id ? contact : res;
            });
          })
          .then(() => {
            contactsServices.getAll().then((response) => setContacts(response));
          })
          .catch((err) => {
            setNotification({
              notificationMessage: `Information of ${newName} has already been removed from the server`,
              notificationClass: "error",
            });

            setTimeout(
              () =>
                setNotification({
                  notificationMessage: null,
                  notificationClass: null,
                }),
              5000
            );
            return;
          });

        setNotification({
          notificationMessage: `Updated ${newName}`,
          notificationClass: "updateNotification",
        });

        setTimeout(
          () =>
            setNotification({
              notificationMessage: null,
              notificationClass: null,
            }),
          5000
        );
      }
    } else {
      contactsServices
        .addContact({ name: newName, number: newNumber })
        .then((res) => setContacts(contacts.concat(res)));

      setNotification({
        notificationMessage: `Added ${newName}`,
        notificationClass: "addedNotification",
      });

      setTimeout(
        () =>
          setNotification({
            notificationMessage: null,
            notificationClass: null,
          }),
        5000
      );
    }
  };

  const deleteContactHandler = (e) => {
    const toBeDeletedId = e.target.value;
    const toBeDeleted = contacts.find(
      (contact) => contact.id === toBeDeletedId
    );

    let confirmation = window.confirm(`Delete ${toBeDeleted.name} ?`);

    if (confirmation) {
      contactsServices.deleteContact(toBeDeletedId);
      let updatedContacts = contacts.filter(
        (contact) => contact.id !== toBeDeletedId
      );
      setContacts(updatedContacts);
      setNotification({
        notificationMessage: `Deleted ${toBeDeleted.name}`,
        notificationClass: "deleteNotification",
      });

      setTimeout(
        () =>
          setNotification({
            notificationMessage: null,
            notificationClass: null,
          }),
        5000
      );
    }
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <Notifications
        notificationMessage={notification.notificationMessage}
        notificationClass={notification.notificationClass}
      />
      <SearchContacts
        searchInput={searchInput}
        searchInputHandler={searchInputHandler}
        searchResult={searchResult}
      />

      <ContactForm
        addContactHandler={addContactHandler}
        newName={newName}
        nameInputHandler={nameInputHandler}
        newNumber={newNumber}
        numberInputHandler={numberInputHandler}
      />

      <DisplayContacts
        contacts={contacts}
        deleteContactHandler={deleteContactHandler}
      />
    </div>
  );
}

export default App;
