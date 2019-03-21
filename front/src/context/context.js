import React from 'react';

export default React.createContext({
  list: [],
  postcode: [],
  addCarToList: () => {},
  removeCarFromList: () => {},
  addPost: () => {},
  removePost: () => {}
});
