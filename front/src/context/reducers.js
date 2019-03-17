export const ADD_CAR = 'ADD_CAR';
export const REMOVE_CAR = 'REMOVE_CAR';

const addCar = (car, state) => {
  const newList = [...state.list];
  const carIndex = newList.findIndex(
    item => item._id === car._id
  );

  if (carIndex < 0) {
    newList.push({ ...car });
  } 
  return { ...state,list: newList };
  
};

const removeCar = (carId, state) => {
  let newList = [...state.list];
  const carIndex = newList.findIndex(
    item => item._id === carId
  );

  if (carIndex >= 0) {
    newList=newList.filter(car=>car._id!==carId);
  } 
  return { ...state,list: newList };
  
};

export const listReducer = (state, action) => {
  switch (action.type) {
    case ADD_CAR:
      return addCar(action.payload, state);
    case REMOVE_CAR:
      return removeCar(action.payload, state);
    default:
      return state;
  }
};