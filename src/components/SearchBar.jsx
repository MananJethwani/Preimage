import React, { useState } from 'react';

const SearchBar = ({ setUserName, setIsLoading }) => {
  const [query, setQuery] = useState('');

  return (
    <>
    <div className='row pt-4'>
      <div className='col-5 offset-3'>
        <input
            type="text"
            name="query"
            className="form-control"
            placeholder="Search Username"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            aria-describedby="basic-addon2"
          />
      </div>
      <div className='col-1'>
      <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              setUserName(query);
              setIsLoading(true);
            }}>search</button>
      </div>
    </div>
    </>
  );
};

export default SearchBar;
