import React from 'react';

export default React.createContext({
  list: [],
  postcode: [],
  settings: [],
  addCarToList: () => {},
  removeCarFromList: () => {},
  addPostToList: () => {},
  removePostFromList: () => {},
  updateSettings: () => {}
});
