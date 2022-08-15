import { useState, useEffect } from "react";

import pbServices from "./services/pbServices";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    pbServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
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

    const duplicate = persons.find(
      ({ name }) => name.toLowerCase() === newName.toLowerCase()
    );

    !newName || !newNumber
      ? showNotification("error", "Cannot leave a field blank")
      : duplicate
      ? showNotification("error", "Name must be unique")
      : pbServices.add(person).then((response) => {
          setPersons(persons.concat(response));
          showNotification("success", `Added ${newName}`);

          clearForm();
        });
  };

  const deletePerson = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);

    if (confirm) {
      pbServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));

          showNotification("caution", `Deleted ${name}`);
        })
        .catch((error) => {
          showNotification("error", error.response.data.message);
        });
    }
  };

  const personsToShow = !filter
    ? persons
    : persons.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <section>
        <h2>Phonebook</h2>

        <Filter
          filter={filter}
          handleFilterChange={({ target }) => setFilter(target.value)}
        />
      </section>

      <section>
        <h3>Add a new contact</h3>

        <Form
          addPerson={addPerson}
          newName={newName}
          handleNameChange={({ target }) => setNewName(target.value)}
          newNumber={newNumber}
          handleNumberChange={({ target }) => setNewNumber(target.value)}
        />

        <Notification notification={notification} />
      </section>

      <section>
        <h3>Numbers</h3>

        <Persons
          personsToShow={personsToShow}
          handleDeleteButton={deletePerson}
        />
      </section>
    </div>
  );
};

export default App;
