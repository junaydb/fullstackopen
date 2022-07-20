import pbServices from "../services";

const Persons = ({ persons, setPersons, filter }) => {
  let personsToShow = [];
  !filter
    ? (personsToShow = persons)
    : (personsToShow = persons.filter(({ name }) =>
        name.toLowerCase().startsWith(filter.toLowerCase())
      ));

  return (
    <section>
      {persons.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        personsToShow.map(({ id, name, number }) => (
          <div key={id}>
            <Person name={name} number={number} />{" "}
            <button
              onClick={() =>
                pbServices
                  .remove(id, name)
                  .then(() => pbServices.getAll())
                  .then((response) => {
                    setPersons(response);
                  })
              }
            >
              delete
            </button>
          </div>
        ))
      )}
    </section>
  );
};

const Person = ({ name, number }) => (
  <>
    {name} {number}
  </>
);

export default Persons;
