import React, { useState } from "react";

export const SearchBarContext = React.createContext({
  searchToggle: false,
  toggleSearchBar: () => {},
});

export default (props) => {
  const [searchToggle, setSearchToggle] = useState(false);

  const toggleSearchBar = () => {
    setSearchToggle(!searchToggle);
    return searchToggle;
  };

  return (
    <SearchBarContext.Provider
      value={{ searchToggle: searchToggle, toggleSearchBar: toggleSearchBar }}
    >
      {props.children}
    </SearchBarContext.Provider>
  );
};
