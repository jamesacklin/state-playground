/* eslint-disable import/prefer-default-export */

export const setUser = (store, user) => {
  store.setState({ currentUser: user });
};
