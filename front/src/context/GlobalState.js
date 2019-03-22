import React, { useReducer } from 'react';
import axios from 'axios';
import Context from './context';
import {
  listReducer,
  ADD_CAR,
  REMOVE_CAR,
  ADD_POST,
  REMOVE_POST
} from './reducers';
export default function GlobalState(props) {
  const [listState, dispatch] = useReducer(listReducer, {
    list: [],
    postcode: []
  });
  const addCarToList = async data => {
    try {
      const response = await axios.post('/api', data);
      const addedCar = await response.data;
      dispatch({ type: ADD_CAR, payload: addedCar });
    } catch (e) {
      return { errored: e };
    }
  };
  const removeCarFromList = id => {
    dispatch({ type: REMOVE_CAR, payload: id });
  };
  const addPost = async postcode => {
    try {
      const response = await axios.post('/api/postcode', { postcode });
      const { lat, lon: lng } = response.data.data.results[0].position;
      console.log({ fromaddpostglobal: { postcode, lat, lng } });
      dispatch({ type: ADD_POST, payload: { postcode, lat, lng } });
    } catch (e) {
      return { error: e };
    }
  };
  const removePost = postcode => {
    dispatch({ type: REMOVE_POST, payload: postcode });
  };
  return (
    <Context.Provider
      value={{
        list: listState.list,
        addCarToList,
        postcode: listState.postcode,
        removeCarFromList,
        addPost,
        removePost
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
