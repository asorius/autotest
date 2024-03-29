import React, { useReducer } from 'react';
import Context from './context';
import {
  listReducer,
  ADD_CAR,
  REMOVE_CAR,
  ADD_POST,
  REMOVE_POST,
  SETTINGS_UPDATE,
  ERROR,
  CLEAR_ERROR,
  ADD_KEY,
  RESET,
} from './reducers';
import data from './data';
export default function GlobalState(props) {
  // const list = JSON.parse(localStorage.getItem('atplist')) || [];
  const list = data;
  let shared = false;
  let onSharedPage = false;
  let key = null;
  if (window.location.pathname.length > 1) {
    onSharedPage = true;
    key = window.location.href.split('/')[3];
    shared = [];
  } else {
    onSharedPage = false;
  }
  let atpsettings = JSON.parse(localStorage.getItem('atpsettings')) || [];
  let atppostcode = JSON.parse(localStorage.getItem('atppostcode')) || false;
  const [listState, dispatch] = useReducer(listReducer, {
    list: shared || list,
    postcodeInformation: atppostcode,
    settings: atpsettings,
    sharekey: key,
    onSharedPage: onSharedPage,
    errors: {},
    options: [
      { name: 'Make year', value: 'year' },
      { name: 'Engine size', value: 'engine' },
      { name: 'Mileage', value: 'mileage' },
      { name: 'Transmission type', value: 'transmission' },
      { name: 'Tax', value: 'tax' },
      { name: 'Part exchange', value: 'exchange' },
      { name: 'Engine power', value: 'enginepower' },
      { name: '0 - 60 mph', value: 'acceleration' },
      { name: 'Top speed', value: 'topspeed' },
      { name: 'Cylinders', value: 'cylinders' },
      { name: 'Engine torque', value: 'torque' },
      { name: 'Driver Convenience', value: 'electrics' },
      { name: 'Safety', value: 'safety' },
      { name: 'Fuel type', value: 'fuel' },
      { name: 'Fuel consumption (urban)', value: 'urban' },
      { name: 'Fuel consumption (extra urban)', value: 'extra' },
      { name: 'Fuel consumption (combined)', value: 'combined' },
      { name: 'Fuel tank capacity', value: 'tank' },
      { name: 'Weight', value: 'weight' },
      { name: 'CO2 emissions', value: 'co2' },
      { name: 'Map & directions', value: 'map' },
    ],
  });

  const addCarToList = async (data) => {
    let optionsListForServer = [
      { name: 'Make year', value: 'year' },
      { name: 'Engine size', value: 'engine' },
      { name: 'Mileage', value: 'mileage' },
      { name: 'Transmission type', value: 'transmission' },
      { name: 'Tax', value: 'tax' },
      { name: 'Part exchange', value: 'exchange' },
      { name: 'Engine power', value: 'enginepower' },
      { name: '0 - 60 mph', value: 'acceleration' },
      { name: 'Top speed', value: 'topspeed' },
      { name: 'Cylinders', value: 'cylinders' },
      { name: 'Engine torque', value: 'torque' },
      { name: 'Driver Convenience', value: 'electrics' },
      { name: 'Safety', value: 'safety' },
      { name: 'Fuel type', value: 'fuel' },
      { name: 'Fuel consumption (urban)', value: 'urban' },
      { name: 'Fuel consumption (extra urban)', value: 'extra' },
      { name: 'Fuel consumption (combined)', value: 'combined' },
      { name: 'Fuel tank capacity', value: 'tank' },
      { name: 'Weight', value: 'weight' },
      { name: 'CO2 emissions', value: 'co2' },
      { name: 'Map & directions', value: 'map{lat lng}' },
    ];
    try {
      const reqbody = {
        query: `
      query {
        getAutodata(url:"${data.url || data.link}"){
          _id
          price
          title
          images
          actualLink
          addedDate
          dealerLink
          mileageDataForDisplay{
            miles
            year
          }
          events{
            date
            status
            data{
              expiredate
              mileage
              notices
              refusal
            }
          }
          seller{
            name
            phone1
            phone2
          }
        ${[...optionsListForServer.map((el) => el.value)].join(' ')}
        }
      }
    `,
      };
      // ${data.settings.join(' ')}

      const graphResponse = await fetch('/graphql', {
        method: 'POST',
        body: JSON.stringify(reqbody),
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
        },
      });
      const json = await graphResponse.json();

      if (json.data.getAutodata) {
        const addedCar = json.data.getAutodata;
        //data from sharedpage autobuild {databaseString,link,date}
        //data from basic add {settings,url}
        //now addedCar supposed to fetched with all possible options
        dispatch({
          type: ADD_CAR,
          payload: { addedCar, url: data.link || data.url, date: data.date },
        });
      } else {
        setError({ msg: 'Invalid link', to: 'add' });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR });
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const saveCarList = async (data) => {
    //incoming data from creation of list {key,list:{link,date}}
    const sorted = data.list.sort((a, b) => b.date - a.date);
    try {
      const reqbody = {
        query: `
        query {
          saveList(key:${data.key},list:[${sorted.map(
          (el) => `"${el.link}@${el.date}"`
        )}])
        }`,
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
      //this function only returns key ('sharekey') to acceess database later
      const sharekey = json.data.saveList;
      dispatch({ type: ADD_KEY, payload: { sharekey } });
    } catch (e) {
      console.log(e);
    }
  };
  const addKeyToState = (key) => {
    dispatch({ type: ADD_KEY, payload: { sharekey: key } });
    dispatch({ type: RESET });
  };
  const getCarList = async (key) => {
    try {
      const reqbody = {
        query: `
      query {
        getList(key:"${key}")
      }
    `,
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
      const list = json.data.getList;
      return list;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteList = async (key) => {
    try {
      const reqbody = {
        query: `
      query {
        deleteList(key:"${key}")
      }
    `,
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
      return json.data.deleteList;
    } catch (e) {
      console.log(e);
    }
  };
  const removeCarFromList = (id) => {
    dispatch({ type: REMOVE_CAR, payload: id });
  };
  const addPostToList = async (postcode) => {
    try {
      const reqbody = {
        query: `
        query {
          getPostCoords(postcode:"${postcode}"){
            postcode
            lat
            lng
          }
        }
      `,
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
      const { postcode: pc, lat, lng } = json.data.getPostCoords;
      if (lat) {
        dispatch({ type: ADD_POST, payload: { postcode: pc, lat, lng } });
      }
      return { postcodeString: pc };
    } catch (e) {
      return { error: e };
    }
  };
  const removePostFromList = (postcode) => {
    dispatch({ type: REMOVE_POST, payload: postcode });
    return false;
  };
  const updateSettings = (settings) => {
    dispatch({ type: SETTINGS_UPDATE, payload: settings });
  };
  const updateListWithNewSettings = ({ urls, newSettings }) => {
    urls.forEach((url, index) => {
      addCarToList({ url, settings: newSettings });
    });
  };
  const resetList = () => {
    dispatch({ type: RESET });
  };
  const setError = (data) => {
    //data={msg,to}
    dispatch({ type: ERROR, payload: data });
    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR });
    }, 2000);
  };

  return (
    <Context.Provider
      value={{
        ...listState,
        addCarToList,
        removeCarFromList,
        addPostToList,
        removePostFromList,
        updateSettings,
        updateListWithNewSettings,
        setError,
        saveCarList,
        getCarList,
        deleteList,
        resetList,
        addKeyToState,
      }}>
      {props.children}
    </Context.Provider>
  );
}
