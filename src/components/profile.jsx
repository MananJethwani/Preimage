import React, { useEffect, useState } from 'react';
import Repositories from './Repositories';
import { Grid } from '@mui/material';

const Profile = ({ user, octokit, isLoading, setIsLoading, darkMode }) => {
  const [profileData, setProfileData] = useState({});
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    octokit
      .request('GET /users/{username}', {
        username: user,
      })
      .then(({ data }) => {
        setIsLoading(false);
        setIsValidUser(true);
        setProfileData(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsValidUser(false);
        console.log(err);
      });
  }, [user]);
  return (
    <>
      {isLoading ? (
        <>
        <Grid xs={4} />
          <Grid>
            <h1>Loading...</h1>
          </Grid>
          <Grid xs={4} />
        </>
      ) : isValidUser ? (
        <>
         <Grid xs={3}/>
          <Grid xs={3}  pt={5} pb={5}>
            <img id="avtar"  src={profileData.avatar_url}></img>
          </Grid>
          <Grid xs={3}  pt={5} pb={5}>
            <h3>{profileData.login}</h3>
            <h3>{profileData.name}</h3>
            <h3>{profileData.bio}</h3>
            <h3>{profileData.location}</h3>
            <h3>followers: {profileData.followers}</h3>
            <h3>following: {profileData.following}</h3>
            <h3>public repos: {profileData.public_repos}</h3>
          </Grid>
          <Grid xs={3}/>
          <Repositories
            darkMode={darkMode}
            userName={user}
            octokit={octokit}
            totalRepos={profileData.public_repos}
          />
        </>
      ) : (
        <h1>Invalid User</h1>
      )}
    </>
  );
};

export default Profile;
