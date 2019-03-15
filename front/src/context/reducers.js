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

// const removeCar = (carId, state) => {
//   console.log('Removing car with id: ' + carId);
//   const updatedList = [...state.list];
//   const updatedItemIndex = updatedList.findIndex(item => item.id === carId);

//   const updatedItem = {
//     ...updatedList[updatedItemIndex]
//   };
 
//   return { ...state, list: updatedList };
// };

export const listReducer = (state, action) => {
  switch (action.type) {
    case ADD_CAR:
      return addCar(action.payload, state);
    default:
      return state;
  }
};