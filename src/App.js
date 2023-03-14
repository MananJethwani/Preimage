import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { Octokit } from '@octokit/core';
import Profile from './components/profile';

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
      <div className={'App container-fluid' + (darkMode ? ' dark-mode' : ' light-mode')}>
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
            user={userName}
            octokit={octokit}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        ) : (
          <></>
        )}
      </div>
  );
}

export default App;
