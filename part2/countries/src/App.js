import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Countries from "./components/Countries";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  // states and handlers
  const [filter, setFilter] = useState("");
  const [data, setData] = useState("");
  const [countryInfo, setCountryInfo] = useState(false);
  const [showCountry, setShowCountry] = useState(false);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setShowCountry(false);
    setCountryInfo(false);
  };

  const handleShowButtonClick = (i) => {
    setShowCountry(true);

    const { name, capital, area, languages, flags, latlng } =
      countriesToShow[i];

    // get weather data
    const api_key = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`;

    axios.get(url).then((response) => {
      const weather = response.data;

      setCountryInfo({ name, capital, area, languages, flags, weather });
    });
  };

  const handleBackButtonClick = () => {
    setShowCountry(false);
    setCountryInfo(false);
  };

  // get countries data
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setData(response.data);
    });
  }, []);

  // put filtered countries into separate array
  let countriesToShow = [];
  if (data) {
    countriesToShow = data.filter(({ name }) =>
      name["common"].toLowerCase().includes(filter.toLowerCase().trim())
    );
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      {!showCountry ? (
        <Countries
          data={data}
          filter={filter}
          countriesToShow={countriesToShow}
          handleShowButtonClick={handleShowButtonClick}
        />
      ) : !countryInfo ? (
        <p>Loading...</p>
      ) : (
        <div>
          <CountryInfo
            name={countryInfo.name["common"]}
            capital={countryInfo.capital}
            area={countryInfo.area}
            languages={countryInfo.languages}
            flag={countryInfo.flags["svg"]}
            weather={countryInfo.weather}
          />

          <button onClick={handleBackButtonClick}>back to search</button>
        </div>
      )}
    </div>
  );
};

export default App;
