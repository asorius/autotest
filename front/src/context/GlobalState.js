import React, { useReducer } from 'react';
import Context from './context';
import {
  listReducer,
  ADD_CAR,
  REMOVE_CAR,
  ADD_POST,
  REMOVE_POST,
  SETTINGS_UPDATE
} from './reducers';
export default function GlobalState(props) {
  const [listState, dispatch] = useReducer(listReducer, {
    list: [],
    postcode: [],
    settings: [],
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
    const addedCar = json.data.getAutodata;
    dispatch({ type: ADD_CAR, payload: addedCar });
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
  return (
    <Context.Provider
      value={{
        list: listState.list,
        addCarToList,
        removeCarFromList,
        postcode: listState.postcode,
        addPostToList,
        removePostFromList,
        settings: listState.settings,
        updateSettings,
        options: listState.options
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
