const Course = ({ name, parts }) => (
  <>
    <Header name={name} />
    <Content parts={parts} />
  </>
);

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  const total = parts.reduce((prev, curr) => {
    return prev + curr.exercises;
  }, 0);

  return (
    <div>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Course;
