import axios from "axios";
import produce from 'immer'

export const getReposByUsername = async (store, username, request = axios) => {
  const status = "LOADING";
  store.setState({ status });
  try {
    const response = await request.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = response.data;
    const isReposEmpty = repos.length === 0;
    const status = isReposEmpty ? "EMPTY" : "SUCCESS";
    store.setState(produce(draft => {
      draft.repos[username] = repos
    }))
    store.setState({ status })
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    store.setState({ status });
  }
};
