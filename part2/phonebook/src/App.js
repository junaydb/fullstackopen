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

    if (!newName || !newNumber) {
      return alert("Cannot leave a field blank");
    }

    const duplicate = persons.find(
      ({ name }) => name.toLowerCase() === newName.toLowerCase()
    );

    if (duplicate) {
      const confirm = window.confirm(
        `${duplicate.name} already exists in your phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        pbServices
          .replace(duplicate.id, person)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== duplicate.id ? person : response
              )
            );
            showNotification("success", `Updated ${newName}`);
          })
          .catch(() => {
            showNotification(
              "error",
              `Information of ${newName} has already been removed from server`
            );
          });

        clearForm();
      }
    } else {
      pbServices.add(person).then((response) => {
        setPersons(persons.concat(response));
        showNotification("success", `Added ${newName}`);

        clearForm();
      });
    }
  };

  const deletePerson = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);

    if (confirm) {
      const request = pbServices.remove(id);
      request.then(() => {
        setPersons(persons.filter((person) => person.id !== id));

        showNotification("caution", `Deleted ${name}`);
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
