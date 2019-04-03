import React from 'react';

export default React.createContext({
  list: [],
  postcode: [],
  settings: [],
  options: [],
  addCarToList: () => {},
  removeCarFromList: () => {},
  addPostToList: () => {},
  removePostFromList: () => {},
  updateSettings: () => {},
  updateListWithNewSettings:()=>{}
});
