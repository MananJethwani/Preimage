import React, { useEffect, useState } from 'react';
import Repositories from './Repositories';

const Profile = ({ user, octokit, isLoading, setIsLoading }) => {
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
        <div className='row'>
          <h1>Loading...</h1>
        </div>
      ) : isValidUser ? (
        <>
          <div class="row pt-5 pb-5 profile-content">
            <div className='offset-2 col-3 col-lg-3 profile-column-content'>
              <img id="avtar"  src={profileData.avatar_url}></img>
            </div>
            <div class="ml-4 col-5 profile-column-content">
              <h3>{profileData.login}</h3>
              <h3>{profileData.name}</h3>
              <h3>{profileData.bio}</h3>
              <h3>{profileData.location}</h3>
              <h3>followers: {profileData.followers}</h3>
              <h3>following: {profileData.following}</h3>
              <h3>public repos: {profileData.public_repos}</h3>
            </div>
          </div>
          <div className='row'>
            <Repositories
              userName={user}
              octokit={octokit}
              totalRepos={profileData.public_repos}
            />
          </div>
        </>
      ) : (
        <h1>Invalid User</h1>
      )}
    </>
  );
};

export default Profile;
