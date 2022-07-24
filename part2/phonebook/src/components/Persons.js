const Persons = ({ personsToShow, handleDeleteButton }) => {
  return (
    <section>
      {personsToShow.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        personsToShow.map(({ id, name, number }) => (
          <div key={id}>
            <Person name={name} number={number} />{" "}
            <button onClick={() => handleDeleteButton(id, name)}>delete</button>
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
