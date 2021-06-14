import React from 'react';

export default React.createContext({
  list: [],
  postcodeInformation: [],
  settings: [],
  sharekey: [],
  onSharedPage: false,
  errors: [],
  options: [],
  sharedlist: [],
  addCarToList: () => {},
  removeCarFromList: () => {},
  addPostToList: () => {},
  removePostFromList: () => {},
  updateSettings: () => {},
  updateListWithNewSettings: () => {},
  setError: () => {},
  getCarList: () => {},
  addKeyToState: () => {},
  saveCarList: () => {},
  resetList: () => {},
});
