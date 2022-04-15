import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Countries() {
  const url = `https://restcountries.com/v2/all`;
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  // const [filteredRegion, setFilteredRegion] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const fetchCountries = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setCountries(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  const searchCountries = (searchValue) => {
    setSearchInput(searchValue);
    console.log(searchValue);
    if (searchInput) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  };

  return (
    <>
      {isLoading ? (
        <h1>Searching...</h1>
      ) : (
        <div>
          <div>
            <Search
              searchCountries={searchCountries}
              searchInput={searchInput}
              setCountries={setCountries}
            />
          </div>
          {searchInput.length > 0 ? (
            <div className="container-block">
              {filtered.map(({ name, population, region, capital, flags }) => (
                <Link to={`/rest-countries/${name}`} key={name}>
                  <div>
                    <div className="image-container">
                      <img className="image" src={flags.png} alt="" />
                    </div>
                    <ul className="info-block">
                      <h2 className="p">{name}</h2>
                      <li className="p">{population}</li>
                      <li className="p">{region}</li>
                      <li className="p">{capital}</li>
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <>
              <div className="container-block">
                {countries.map(
                  ({ name, population, region, capital, flags }) => (
                    <Link to={`/rest-countries/${name}`} key={name}>
                      <div>
                        <div className="image-container">
                          <img className="image" src={flags.png} alt="" />
                        </div>
                        <ul className="info-block">
                          <h2 className="p"> {name}</h2>
                          <li className="p">Population: {population}</li>
                          <li className="p">Region: {region}</li>
                          <li className="p">Capital: {capital}</li>
                        </ul>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}