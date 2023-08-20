import { useState } from "react";

const Search = ({ pins }) => {
  // set initial state for search
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        text="text"
        className="navbar_searchBar"
        placeholder="Search"
        onChange={(event) => setQuery(event.target.value)}
      />
      {pins
        .filter((pin) => {
          if (query === "") {
            return false;
          } else if (pin.title.toLowerCase().includes(query.toLowerCase())) {
            return pin;
          }
          return false;
        })
        .map((pin) => {
          return (
            <div className="searchbox" key={pin._id}>
              <p>{pin.title}</p>
              <p>{pin.username}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Search;
