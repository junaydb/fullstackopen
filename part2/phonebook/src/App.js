import { useState, useEffect } from "react";

import pbServices from "./services";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    pbServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const showNotif = (type, message) => {
    setMessage(message);
    setMessageType(type);

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDeleteButton = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);

    if (confirm) {
      const request = pbServices.remove(id, name, confirm);
      request.then(() => {
        setPersons(persons.filter((person) => person.id !== id));

        showNotif("caution", `Deleted ${name}`);
      });
    }
  };

  const addPerson = (e) => {
    e.preventDefault();

    const clearForm = () => {
      setNewName("");
      setNewNumber("");
    };

    const person = {
      name: newName,
      number: newNumber,
    };

    if (!newName || !newNumber) {
      return alert("Cannot leave a field blank");
    }

    let confirm;
    const duplicate = persons.find(
      ({ name }) => name.toLowerCase() === newName.toLowerCase()
    );

    if (duplicate) {
      confirm = window.confirm(
        `${duplicate.name} already exists in your phonebook, replace the old number with a new one?`
      );
    } else {
      pbServices.add(person).then((response) => {
        setPersons(persons.concat(response));
        showNotif("success", `Added ${newName}`);
      });

      clearForm();
    }

    if (confirm) {
      pbServices
        .replace(duplicate.id, person)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== duplicate.id ? person : response
            )
          );

          showNotif("success", `Updated ${newName}`);
        })
        .catch(() => {
          showNotif(
            "error",
            `Information of ${newName} has already been removed from server`
          );
        });

      clearForm();
    }
  };

  return (
    <div>
      <section>
        <h2>Phonebook</h2>

        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </section>

      <section>
        <h3>Add a new contact</h3>

        <Form
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />

        <Notification type={messageType} message={message} />
      </section>

      <section>
        <h3>Numbers</h3>

        <Persons
          filter={filter}
          persons={persons}
          handleDeleteButton={handleDeleteButton}
        />
      </section>
    </div>
  );
};

export default App;
