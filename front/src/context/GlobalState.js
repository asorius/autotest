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
  ADD_KEY
} from './reducers';
export default function GlobalState(props) {
  //if there is data in localstorage , the state will pull data from it , if not, defaults will be applied
  let lsdata = localStorage.getItem('atpdata');
  //to enable inline checking without errors
  lsdata = lsdata ? JSON.parse(lsdata) : {};
  //if there is data in localstorage , the state will pull data from it , if not, defaults will be applied
  let lskey = localStorage.getItem('atpkey');
  //to enable inline checking without errors
  lskey = lskey ? lskey : null;
  const [listState, dispatch] = useReducer(listReducer, {
    list: lsdata.list || [],
    postcode: lsdata.postcode || false,
    settings: lsdata.settings || [],
    sharekey: lskey,
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
      { name: 'Map & directions', value: 'map{lat lng}' }
    ]
  });
  const addCarToList = async data => {
    try {
      const reqbody = {
        query: `
      query {
        getAutodata(url:"${data.url}"){
          _id
          price
          title
          images
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
        ${data.settings.join(' ')}
        }
      }
    `
      };
      const graphResponse = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        body: JSON.stringify(reqbody),
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json'
        }
      });
      const json = await graphResponse.json();
      if (json.data.getAutodata) {
        const addedCar = json.data.getAutodata;
        dispatch({ type: ADD_CAR, payload: { addedCar, url: data.url } });
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
  const saveList = async data => {
    try {
      console.log(data);
      const reqbody = {
        query: `
      query {
        saveList(key:${data.key},list:${data.list})
      }
    `
      };
      const graphResponse = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        body: JSON.stringify(reqbody),
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json'
        }
      });
      const json = await graphResponse.json();
      console.log(json);
      const sharekey = json.data.saveList;
      dispatch({ type: ADD_KEY, payload: { sharekey } });
    } catch (e) {
      console.log(e);
    }
  };
  const removeCarFromList = id => {
    dispatch({ type: REMOVE_CAR, payload: id });
  };
  const addPostToList = async postcode => {
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
      `
      };
      const graphResponse = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        body: JSON.stringify(reqbody),
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json'
        }
      });
      const json = await graphResponse.json();
      const { postcode: pc, lat, lng } = json.data.getPostCoords;
      dispatch({ type: ADD_POST, payload: { postcode: pc, lat, lng } });
    } catch (e) {
      return { error: e };
    }
  };
  const removePostFromList = postcode => {
    dispatch({ type: REMOVE_POST, payload: postcode });
  };
  const updateSettings = settings => {
    dispatch({ type: SETTINGS_UPDATE, payload: settings });
  };
  const updateListWithNewSettings = ({ urls, newSettings }) => {
    urls.forEach((url, index) => {
      addCarToList({ url, settings: newSettings });
    });
  };
  const setError = data => {
    //data={msg,to}
    dispatch({ type: ERROR, payload: data });
    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR });
    }, 2000);
  };
  return (
    <Context.Provider
      value={{
        list: listState.list,
        errors: listState.errors,
        addCarToList,
        removeCarFromList,
        postcode: listState.postcode,
        addPostToList,
        removePostFromList,
        settings: listState.settings,
        updateSettings,
        updateListWithNewSettings,
        options: listState.options,
        setError,
        saveList
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
