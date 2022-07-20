import { useState, useEffect } from "react";
import axios from "axios";

import pbServices from "./services";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((result) => {
      setPersons(result.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

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
      pbServices
        .add(person)
        .then((response) => setPersons(persons.concat(response)));

      setNewName("");
      setNewNumber("");
    }

    if (confirm) {
      pbServices
        .replace(duplicate.id, person)
        .then(() => pbServices.getAll())
        .then((response) => setPersons(response));

      setNewName("");
      setNewNumber("");
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
      </section>

      <section>
        <h3>Numbers</h3>

        <Persons filter={filter} persons={persons} setPersons={setPersons} />
      </section>
    </div>
  );
};

export default App;
