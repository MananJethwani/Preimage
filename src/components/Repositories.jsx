import React, { useEffect } from 'react';

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

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {repoList.map((repo) => {
            return (
              <div key={repo.id} class="card offset-2 col-8 mb-4">
                <div class="card-header">
                  <h1>{repo.name}</h1>
                </div>
                <div class="card-body">
                  <p class="card-title">{repo.description}</p>
                  <p class="card-title"><span>Language: </span> {repo.language}</p>
                  <p class="card-title"><span>Forks:</span> {repo.forks_count}</p>
                  <p class="card-title"><span>Watchers: </span> {repo.watchers_count}</p>
                </div>
              </div>
            );
          })}
          <div className='row pb-5'>
            <div className='offset-5 col-1'>
              <button className='btn btn-primary' disabled={page == 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            </div>
            <div className='col-1'>
            <button className='btn btn-primary'
              disabled={parseInt(totalRepos / 10) + (totalRepos % 10 != 0) <= page}
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
