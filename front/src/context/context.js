import React from 'react';

export default React.createContext({
  list: [],
  postcode: [],
  settings: [],
  sharekey: [],
  errors: [],
  options: [],

  addCarToList: () => {},
  removeCarFromList: () => {},
  addPostToList: () => {},
  removePostFromList: () => {},
  updateSettings: () => {},
  updateListWithNewSettings: () => {},
  setError: () => {},
  getCarList: () => {},
  saveCarList: () => {},
  resetList: () => {}
});
