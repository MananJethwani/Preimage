import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Repositories = ({ userName, octokit, totalRepos }) => {
  let [repoList, setRepoList] = React.useState([]);
  let [page, setPage] = React.useState(1);
  let [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    octokit
      .request('GET /users/{username}/repos', {
        username: userName,
        page: page,
        per_page: 10,
      })
      .then(({ data }) => {
        setRepoList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [userName, page]);
// <div key={repo.id} class="card offset-2 col-8 mb-4">
              //   <div class="card-header">
              //     <h1>{repo.name}</h1>
              //   </div>
              //   <div class="card-body">
              //     <p class="card-title">{repo.description}</p>
              //     <p class="card-title"><span>Language: </span> {repo.language}</p>
              //     <p class="card-title"><span>Forks:</span> {repo.forks_count}</p>
              //     <p class="card-title"><span>Watchers: </span> {repo.watchers_count}</p>
              //   </div>
              // </div>
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {repoList.map((repo) => {
            return (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {repo.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {repo.description}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    language: {repo.language}
                  </Typography>
                  <Typography variant="body2">
                    forks: {repo.forks}
                    <br />
                    watchers: {repo.watchers}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
          <div className="row pb-5">
            <div className="offset-5 col-1">
              <button
                className="btn btn-primary"
                disabled={page == 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
            </div>
            <div className="col-1">
              <button
                className="btn btn-primary"
                disabled={
                  parseInt(totalRepos / 10) + (totalRepos % 10 != 0) <= page
                }
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Repositories;
