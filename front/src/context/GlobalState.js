import React, { useReducer } from 'react';
import axios from 'axios';
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
    settings: []
  });
  const addCarToList = async data => {
    const reqbody = {
      query: `
      query {
        getAutodata(url:"${data.url}"){
          _id
          price
          title
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
    console.log({ addedCar, id: addedCar._id });
    dispatch({ type: ADD_CAR, payload: addedCar });
    // try {
    //   const response = await axios.post('/api', data);
    //   const addedCar = await response.data;
    //   dispatch({ type: ADD_CAR, payload: addedCar });
    // } catch (e) {
    //   return { errored: e };
    // }
  };
  const removeCarFromList = id => {
    dispatch({ type: REMOVE_CAR, payload: id });
  };
  const addPostToList = async postcode => {
    try {
      const response = await axios.post('/api/postcode', { postcode });
      const { lat, lon: lng } = response.data.data.results[0].position;
      dispatch({ type: ADD_POST, payload: { postcode, lat, lng } });
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
        updateSettings
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
