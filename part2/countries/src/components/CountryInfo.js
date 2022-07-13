const CountryInfo = ({ name, capital, area, languages, flag, weather }) => (
  <div>
    <h2>{name}</h2>

    <section>
      <div>
        <strong>capital: </strong>
        {capital}
      </div>

      <div>
        <strong>area: </strong> {area}km^2
      </div>
    </section>

    <br />

    <section>
      <div>
        <strong>language{"(s)"}:</strong>
      </div>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={flag} style={{ width: 250 }} />
    </section>

    <section>
      <h2>Weather in {name}</h2>
      <p>
        <strong>temperature: </strong>
        {weather.main["temp"]}°C
      </p>

      <p>
        <strong>wind: </strong>
        {weather.wind["speed"]} m/s
      </p>

      <p>{weather.weather[0]["description"]}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0]["icon"]}@2x.png`}
      />
    </section>
  </div>
);

export default CountryInfo;
