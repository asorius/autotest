export const ADD_CAR = 'ADD_CAR';
export const REMOVE_CAR = 'REMOVE_CAR';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';

const addCar = (data, state) => {
  const car={...data.addedCar,url:data.url}
  const newList = [...state.list];
  const carIndex = newList.findIndex(item => item._id === car._id);

  if (carIndex < 0) {
    newList.push({ ...car });
  }
  return { ...state, list: newList };
};

const removeCar = (carId, state) => {
  let newList = [...state.list];
  const carIndex = newList.findIndex(item => item._id === carId);

  if (carIndex >= 0) {
    newList = newList.filter(car => car._id !== carId);
  }
  return { ...state, list: newList };
};

const addPost = (data, state) => {
  //data looks like {postcode:'23423',lat:2342,lng:asdfsdf}
  return { ...state, postcode: [{ ...data }] };
};
const updateSettings = (newSettings, state) => {
  return { ...state, settings: newSettings };
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
    // case REMOVE_POST:
    //   return removePost(action.payload, state);
    default:
      return state;
  }
};
