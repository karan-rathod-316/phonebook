import React from "react";

export default function ContactForm({
  addContactHandler,
  newName,
  nameInputHandler,
  newNumber,
  numberInputHandler,
}) {
  return (
    <div>
      <h2>Add a new number</h2>
      <form onSubmit={addContactHandler}>
        <div>
          name: <input value={newName} onChange={nameInputHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberInputHandler} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
