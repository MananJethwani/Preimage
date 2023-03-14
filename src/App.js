import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { Octokit } from '@octokit/core';
import Profile from './components/profile';
import { Grid } from '@mui/material';

function App() {
  let [userName, setUserName] = useState('');
  let [octokit, setOctokit] = useState(null);
  let [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const octokit = new Octokit({
      auth: '',
    });
    setOctokit(octokit);
  }, []);

  // useEffect(() => {
  // }, [userName]);

  return (
      <div className={'App ' + (darkMode ? ' dark-mode' : ' light-mode')}>
        <Grid sx={{pt: 3}} rowSpacing={5} justifyContent="center" alignItems="center" container>
        <button
          className="but"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          {' '}
          {darkMode ? 'light mode' : 'dark mode'}
        </button>
        <SearchBar setUserName={setUserName} setIsLoading={setIsLoading} />
        {octokit && userName ? (
          <Profile
            darkMode={darkMode}
            user={userName}
            octokit={octokit}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        ) : (
          <></>
        )}
        </Grid>
      </div>
  );
}

export default App;
