import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';

const SearchBar = ({ setUserName, setIsLoading }) => {
  const [query, setQuery] = useState('');

  return (
    <>
    <div className='row pt-4'>
      <div className='col-5 offset-3'>
      <TextField
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
      <Button variant='contained' color='primary'
            type="button"
            onClick={() => {
              setUserName(query);
              setIsLoading(true);
            }}>search</Button>
      </div>
    </div>
    </>
  );
};

export default SearchBar;
