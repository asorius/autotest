import React from 'react';

export default React.createContext({
  list: [],
  postcodeInformation: [],
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
  resetList: () => {},
});
