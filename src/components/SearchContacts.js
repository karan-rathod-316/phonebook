import React from "react";

export default function SearchContacts({
  searchInput,
  searchInputHandler,
  searchResult,
}) {
  return (
    <div>
      Filter shown with
      <input value={searchInput} onChange={searchInputHandler} />
      {searchInput &&
        searchResult.map((result) => (
          <p key={result.name}>
            {result.name} {result.number}
          </p>
        ))}
    </div>
  );
}
