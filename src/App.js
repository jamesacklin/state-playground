/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import useGlobal from './store';

const SearchForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [globalState, globalActions] = useGlobal();
  const searchSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    globalActions.setUser.setUser(username);
    globalActions.github.getReposByUsername(username);
  };
  return (
    <form onSubmit={searchSubmit}>
      <input name="username" placeholder="username" autoComplete="off" />
      <button type="submit">Search</button>
    </form>
  );
};

const mapRepos = (repos) => repos.map((repo) => (
  <a
    key={repo.id}
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3>{repo.name}</h3>
  </a>
));

const Results = () => {
  // eslint-disable-next-line no-unused-vars
  const [globalState, globalActions] = useGlobal();
  const { status, repos, currentUser } = globalState;
  return (
    <>
      {status === 'LOADING' && <h4>Loading...</h4>}
      {status === 'SUCCESS' && mapRepos(repos[currentUser])}
      {status === 'EMPTY' && <h4>This user have zero repos</h4>}
      {status === 'NOT_FOUND' && <h4>404 - User not found</h4>}
      {status === 'ERROR' && <h4>Connection Error</h4>}
    </>
  );
};

const App = () => (
  <div>
    <SearchForm />
    <Results />
  </div>
);

export default App;
