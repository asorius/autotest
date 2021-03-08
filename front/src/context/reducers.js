export const ADD_CAR = 'ADD_CAR';
export const REMOVE_CAR = 'REMOVE_CAR';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';
export const ERROR = 'ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const ADD_KEY = 'ADD_KEY';
export const RESET = 'RESET';

const addCar = (data, state) => {
  const car = { ...data.addedCar, url: data.url };
  const newList = [...state.list];
  const carIndex = newList.findIndex((item) => item._id === car._id);
  if (carIndex < 0) {
    newList.push({ ...car });
    localStorage.setItem(
      'atplist',
      JSON.stringify({
        list: newList,
      })
    );
  }
  return { ...state, list: newList };
};

const removeCar = (carId, state) => {
  let newList = [...state.list];
  const carIndex = newList.findIndex((item) => item._id === carId);

  if (carIndex >= 0) {
    newList = newList.filter((car) => car._id !== carId);
    localStorage.setItem(
      'atplist',
      JSON.stringify({
        list: newList,
      })
    );
  }
  return { ...state, list: newList };
};
const popError = (data, state) => {
  return { ...state, errors: data };
};
const clearError = (state) => {
  return { ...state, errors: {} };
};
const addPost = (data, state) => {
  //data looks like {postcode:'23423',lat:2342,lng:asdfsdf}
  return { ...state, postcode: { ...data } };
};
const removePost = (postcode, state) => {
  if (state.postcode.postcode !== postcode) {
    return { ...state };
  } else {
    return { ...state, postcode: false };
  }
};
const updateSettings = (newSettings, state) => {
  return { ...state, settings: newSettings };
};
const addKey = (data, state) => {
  return { ...state, sharekey: data.sharekey };
};
const reset = (state) => {
  return { ...state, list: [] };
};
export const listReducer = (state, action) => {
  switch (action.type) {
    case ADD_CAR:
      return addCar(action.payload, state);
    case REMOVE_CAR:
      return removeCar(action.payload, state);
    case ADD_POST:
      return addPost(action.payload, state);
    case SETTINGS_UPDATE:
      return updateSettings(action.payload, state);
    case ERROR:
      return popError(action.payload, state);
    case CLEAR_ERROR:
      return clearError(state);
    case REMOVE_POST:
      return removePost(action.payload, state);
    case ADD_KEY:
      return addKey(action.payload, state);
    case RESET:
      return reset(state);

    default:
      return state;
  }
};
