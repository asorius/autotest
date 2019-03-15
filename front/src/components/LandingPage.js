import React,{useContext,useState,useEffect} from 'react'
import  Context  from "../context/context";
import CompareItem from './CompareItem'
export default function LandingPage(props) {
    const [url,setUrl]=useState('')
    const context=useContext(Context)
    const onChange=(e)=>{
        setUrl(e.target.value.toLowerCase())
    }
    const addCarFunc=async (e)=>{
        e.preventDefault()
        try{
            await context.addCarToList({url})
            setUrl('')
        }catch(e){
            return {errored:e}
        }
    }
    useEffect(()=>{
        console.log(context)
      },[context])
  return (
    <div>
        <div className='title'>
            <h1> AutoCompare</h1>
        </div>
        <div className='container'>
            <div className='inputs'>
                <input type='text' value={url} onChange={onChange} />
                <button onClick={addCarFunc}>Add</button>
            </div>
        </div>
        <div className='comparing-container'>
        {context.list.map(item=>{
            return <CompareItem item={item}></CompareItem>
        })} 
        </div>
    </div>
  )
}