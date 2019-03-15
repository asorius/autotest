import React,{useContext,useState,useEffect} from 'react'
import  Context  from "../context/context";
import CompareItem from './CompareItem'
import classnames from 'classnames'

export default function LandingPage(props) {
    const [url,setUrl]=useState('')
    const [loading,setLoading]=useState(false)
    const context=useContext(Context)
    const onChange=(e)=>{
        setUrl(e.target.value.toLowerCase())
    }
    const addCarFunc=async (e)=>{
        setLoading(!loading)
        e.preventDefault()
        try{
            await context.addCarToList({url})
            setLoading(false)
            setUrl('')
        }catch(e){
            return {errored:e}
        }
    }
  return (
    <div>
        <div className='title'>
            <h1> AutoPare</h1>
        </div>
        <div className='container'>
            <div className={classnames('control',{
              'is-loading':loading  
            })}>
                <input className='input' type='text' value={url} onChange={onChange}  placeholder='Paste car link from AutoTrader to add to the list'/>
                <button className={classnames('button is-info is-fullwidth',{
              'is-loading':loading  
            })} onClick={addCarFunc}>Add</button>
            </div>
        </div>
        <div className='comparing-container'>
        {context.list.map(item=>{
            return <CompareItem key={item._id} item={item}></CompareItem>
        })} 
        </div>
    </div>
  )
}