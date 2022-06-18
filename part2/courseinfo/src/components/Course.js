const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
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
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Course;
