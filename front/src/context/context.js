import React from 'react';

export default React.createContext({
  list: [],
  postcode: [],
  settings: [],
  sharekey: null,
  errors: [],
  options: [],
  addCarToList: () => {},
  removeCarFromList: () => {},
  addPostToList: () => {},
  removePostFromList: () => {},
  updateSettings: () => {},
  updateListWithNewSettings: () => {},
  setError: () => {},
  saveList: () => {}
});
