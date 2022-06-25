const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter contacts by name:{" "}
    <input value={filter} onChange={handleFilterChange} />
  </div>
);

export default Filter;
