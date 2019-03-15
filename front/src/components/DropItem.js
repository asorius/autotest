import React from 'react'

export default function DropItem(props) {
    const capitalized=s=>{
        const ns=s.toString().substring(11,s.toString().length).charAt(0).toUpperCase() 
        return ns+ s.slice(12)
    }
    const motEvent=props.item
  return (
      <div className="dropdown-item ">
      <div>{capitalized(motEvent.status)}ed at {motEvent.eventDate.substring(0,10)}</div>
        <div>Miles driven since last MOT :{props.driven}</div>
    </div>
  )
}
