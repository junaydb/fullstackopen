const Persons = ({ persons, filter }) => (
  <div>
    {!filter
      ? persons.map(({ id, name, number }) => (
          <Person key={id} name={name} number={number} />
        ))
      : persons
          .filter(({ name }) =>
            name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(({ id, name, number }) => (
            <Person key={id} name={name} number={number} />
          ))}
  </div>
);

const Person = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

export default Persons;
