export const ADD_CAR = 'ADD_CAR';
export const REMOVE_CAR = 'REMOVE_CAR';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';
export const ERROR = 'ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const ADD_KEY = 'ADD_KEY';
export const RESET = 'RESET';
const saveCarList = async (state, list) => {
  try {
    const key = state.sharekey;
    if (key) {
      const reducedUrls = list.reduce(
        (accumulator, current) => [
          ...accumulator,
          {
            link: current.actualLink,
            date: current.date || new Date().getTime(),
          },
        ],
        []
      );
      const sorted = reducedUrls.sort((a, b) => b.date - a.date);
      // saveList(key:"${key}",list:[${reducedUrls.map((el) => `"${el}"`)}])
      const reqbody = {
        query: `
      query {
        saveList(key:"${key}",list:[${sorted.map(
          (el) => `"${el.link}@${el.date}"`
        )}])}`,
      };
      const graphResponse = await fetch('/graphql', {
        method: 'POST',
        body: JSON.stringify(reqbody),
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
        },
      });
      const json = await graphResponse.json();
      localStorage.setItem(key, JSON.stringify([...list]));
    }
  } catch (e) {
    console.log(e);
  }
};
const send = async (state, list) => {
  await saveCarList(state, list);
};
const addCar = (data, state) => {
  // added date property to car object
  //ADD DATE AND SAVE TO LOCAL OR DATABASE
  const car = {
    ...data.addedCar,
    url: data.url || data.link,
    date: data.date || new Date().getTime(),
  };
  // state list is obtained on initial mount , in globalstate.js, and is either sharelist or local normal list
  const oldList = [...state.list];
  const newList = oldList;
  newList.push({ ...car });
  state.onSharedPage ||
    localStorage.setItem('atplist', JSON.stringify(newList));

  state.onSharedPage && send(state, newList);

  return { ...state, list: newList };
};

const removeCar = (carId, state) => {
  let oldList = [...state.list];
  let newList = [];
  const carIndex = oldList.findIndex((item) => item._id === carId);
  if (carIndex >= 0) {
    newList = oldList.filter((car) => car._id !== carId);
    state.onSharedPage ||
      localStorage.setItem('atplist', JSON.stringify(newList));

    state.onSharedPage && send(state, newList);
  } else {
    console.log('vehicle could not have been found.');
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
  localStorage.setItem('atppostcode', JSON.stringify(data));
  if (state.settings.includes('map')) {
    return {
      ...state,
      postcodeInformation: data,
    };
  } else {
    localStorage.setItem(
      'atpsettings',
      JSON.stringify([...state.settings, 'map'])
    );
    return {
      ...state,
      postcodeInformation: data,
      settings: [...state.settings, 'map'],
    };
  }
};
const removePost = (item, state) => {
  localStorage.setItem('atppostcode', false);

  return {
    ...state,
    postcodeInformation: false,
  };
};
const updateSettings = (newSettings, state) => {
  localStorage.setItem('atpsettings', JSON.stringify(newSettings));
  return { ...state, settings: newSettings };
};
const addKey = (data, state) => {
  return { ...state, sharekey: data.sharekey };
};
const reset = (state) => {
  state.onSharedPage
    ? localStorage.setItem(state.sharekey, JSON.stringify([]))
    : localStorage.setItem(
        'atplist',
        JSON.stringify({
          list: [],
        })
      );
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
