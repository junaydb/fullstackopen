import { useState } from "react";

const Anecdote = ({ text, votes }) => (
  <>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, updateVotes] = useState(new Array(anecdotes.length).fill(0));

  const setRandom = (selected) => {
    let nextSelected = Math.floor(Math.random() * anecdotes.length);
    // ensure same anecdote doesn't appear consecutively
    while (nextSelected === selected) {
      nextSelected = Math.floor(Math.random() * anecdotes.length);
    }
    return setSelected(nextSelected);
  };

  const addVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected]++;
    return updateVotes(updatedVotes);
  };

  const getHighestVote = () => {
    return Math.max(...votes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={() => addVote()} text="vote" />
      <Button handleClick={() => setRandom(selected)} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <Anecdote
        text={anecdotes[votes.indexOf(getHighestVote())]}
        votes={votes[votes.indexOf(getHighestVote())]}
      />
    </div>
  );
};

export default App;
