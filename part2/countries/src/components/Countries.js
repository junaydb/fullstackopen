const Countries = ({
  data,
  filter,
  countriesToShow,
  handleShowButtonClick,
}) => (
  <div>
    {!data ? (
      <p>Loading...</p>
    ) : !filter ? (
      <p>Start typing the name of a country</p>
    ) : countriesToShow.length > 10 ? (
      <p>Too many matches, specify another filter.</p>
    ) : countriesToShow.length === 0 ? (
      <div>No results</div>
    ) : (
      countriesToShow.map(({ name, cca3 }, i) => (
        <div key={cca3}>
          <strong>{`[${cca3}]`} </strong>
          {name["common"]}

          <button key={cca3} onClick={() => handleShowButtonClick(i)}>
            view
          </button>
        </div>
      ))
    )}
  </div>
);

export default Countries;
