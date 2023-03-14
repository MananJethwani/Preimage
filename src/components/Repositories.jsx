import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useState } from 'react';

const Repositories = ({ userName, octokit, totalRepos, darkMode }) => {
  let [repoList, setRepoList] = React.useState([]);
  let [page, setPage] = React.useState(1);
  let [isLoading, setIsLoading] = React.useState(false);
  let [theme, setTheme] = useState({});

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

  useEffect(() => {
    let innerTheme = {};
    if (!darkMode) {
      innerTheme = {
        background: 'rgb(240 240 240)',
        color: '#000',
      };
    } else {
      innerTheme = {
        background: '#fff',
        color: '#000',
      };
    }
    setTheme(innerTheme);
  }, [darkMode])

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {repoList.map((repo) => {
            return (
              <>
                <Grid  xs={2} />
                <Grid xs={8} pb={5}>
                  <Card style={theme} className='custom-card' xs={{ minWidth: 275 }}>
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
                </Grid>
                <Grid xs={2} />
              </>
            );
          })}
          <Grid xs={4} />
          <Grid pb={5} xs={2}>
            <Button
              variant='contained' color='primary'
              disabled={page == 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
          </Grid>
          <Grid pb={5} xs={2}>
            <Button
              variant='contained' color='primary'
              disabled={
                parseInt(totalRepos / 10) + (totalRepos % 10 != 0) <= page
              }
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Grid>
          <Grid xs={4} />
        </>
      )}
    </>
  );
};

export default Repositories;
