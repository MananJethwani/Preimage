import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';

const SearchBar = ({ setUserName, setIsLoading }) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Grid item xs={3} ></Grid>
      <Grid item xs={5}>
          <TextField
              type="text"
              name="query"
              className="form-control"
              placeholder="Search Username"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              aria-describedby="basic-addon2"
            />
      </Grid>
      <Grid item xs={1}>
      <Button variant='contained' color='primary'
            type="button"
            onClick={() => {
              setUserName(query);
              setIsLoading(true);
            }}>search</Button>
      </Grid>
      <Grid item xs={3}></Grid>
    </>
  );
};

export default SearchBar;
