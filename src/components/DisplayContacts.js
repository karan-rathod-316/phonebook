import React from "react";

export default function DisplayContacts({ contacts, deleteContactHandler }) {
  return (
    <div>
      <h2>Numbers</h2>
      {contacts.map((contact) => (
        <p key={contact.name}>
          {contact.name} {contact.number}
          <button value={contact.id} onClick={deleteContactHandler}>
            Delete
          </button>
        </p>
      ))}
    </div>
  );
}
