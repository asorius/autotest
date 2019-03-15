import React from 'react'

export default function DropItem(props) {
    const capitalized=s=>{
        const ns=s.toString().substring(11,s.toString().length).charAt(0).toUpperCase() 
            return ns+ s.slice(12)
        }
  return (
      <div className="dropdown-item ">
      {capitalized(props.item.status)}ed at {props.item.eventDate.substring(0,10)}
         {/* <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="false" aria-controls="dropdown-menu4">
                <span>{capitalized(props.item.status)}ed at {props.item.eventDate.substring(0,10)}</span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                <div className="dropdown-content">
                <div className="dropdown-item">
                    <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
                </div>
                </div>
            </div>
            </div> */}
    </div>
  )
}
