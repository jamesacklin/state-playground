/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import produce from 'immer';

export const getReposByUsername = async (store, username, request = axios) => {
  let status = 'LOADING';
  store.setState({ status });
  try {
    const response = await request.get(
      `https://api.github.com/users/${username}/repos`,
    );
    const repos = response.data;
    const isReposEmpty = repos.length === 0;
    status = isReposEmpty ? 'EMPTY' : 'SUCCESS';
    store.setState(produce((draft) => {
      draft.repos[username] = repos;
    }));
    store.setState({ status });
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    status = isError404 ? 'NOT_FOUND' : 'ERROR';
    store.setState({ status });
  }
};
