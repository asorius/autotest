import React, {useReducer} from 'react'
import axios from 'axios'
import Context from './context'
import { listReducer, ADD_CAR, REMOVE_CAR } from './reducers';
export default function GlobalState(props) {
    const [listState,dispatch]=useReducer(listReducer,{list:[]})
    const addCarToList= async data=>{
      try{
        const response=await axios.post('/api',data)
        const addedCar=await response.data
        dispatch({type:ADD_CAR,payload:addedCar})        
        }catch(e){
          return {errored:e} 
        }
    }
    const removeCarFromList= id=>{
        dispatch({type:REMOVE_CAR,payload:id})        
      }
  return (
    <Context.Provider value={{list:listState.list,addCarToList,removeCarFromList}}>
    {props.children}
      </Context.Provider>
  )
}
