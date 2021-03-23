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
export default function GlobalState(props) {
  const list = JSON.parse(localStorage.getItem('atplist'));
  let lsdata = list || { list: [] };

  let atpsettings = JSON.parse(localStorage.getItem('atpsettings')) || [];
  let atppostcode = JSON.parse(localStorage.getItem('atppostcode')) || false;
  console.log({ atppostcode });
  const [listState, dispatch] = useReducer(listReducer, {
    list: lsdata.list || [],
    postcode: atppostcode,
    settings: atpsettings,
    sharekey: null,
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
      { name: 'Map & directions', value: 'map{lat lng}' },
    ],
  });
  const addCarToList = async (data) => {
    let options = [
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
        getAutodata(url:"${data.url}"){
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
        ${[...options.map((el) => el.value)].join(' ')}
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
        //now addedCar supposed to fetched with all possible options
        dispatch({
          type: ADD_CAR,
          payload: { addedCar, url: data.actualLink || data.url },
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
    console.log('saving car list');
    try {
      console.log({ savingcarlist: data });
      const reqbody = {
        query: `
      query {
        saveList(key:${data.key},list:[${data.list.map((el) => `"${el}"`)}])
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
      const sharekey = json.data.saveList;
      dispatch({ type: ADD_KEY, payload: { sharekey } });
    } catch (e) {
      console.log(e);
    }
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
      return { res: pc };
    } catch (e) {
      return { error: e };
    }
  };
  const removePostFromList = (postcode) => {
    console.log({ postcodefromglobal: postcode });
    dispatch({ type: REMOVE_POST, payload: postcode });
    return false;
  };
  const updateSettings = (settings) => {
    console.log({ settings });
    dispatch({ type: SETTINGS_UPDATE, payload: settings });
  };
  const updateListWithNewSettings = ({ urls, newSettings }) => {
    console.log({ newSettings });
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
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
