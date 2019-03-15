import React, {useContext,useEffect} from 'react'
import Context from '../context/context'

export default function CompareItem(props) {
  return (
    <div>
        <div className='title'>
        <h3>{props.item.mainData.title}</h3>
        </div>
    </div>
  )
}
