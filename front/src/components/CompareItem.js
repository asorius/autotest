import React, {useState} from 'react'
import classnames from 'classnames'
import DropItem from './DropItem'
export default function CompareItem(props) {
  const [drop,setDrop]=useState(false)
  const toggleDrop=(e)=>{
    e.preventDefault()
    console.log(props.item.events)
    setDrop(!drop)
  }
  return (
    <div className='tile is child box is-4'>
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={props.item.mainData.images[0]} alt="Car"/>
            </figure>
          </div>
          <div className="card-content">
            <h3>{props.item.mainData.title}</h3>
          </div>

          <div className="content">
              {props.item.mainData.sellerDescription}
          </div>

          <div className='card-footer'>
            <div className={classnames("dropdown is-up",{
              'is-active':drop
            })}>
            <div className="dropdown-trigger">
              <button onClick={toggleDrop} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>MOT history</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-up" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {props.item.events.map((item,index) => {
                  if(index<5){
                  return <DropItem item={item} key={item.data.test_number}></DropItem>
                }
                })}
              </div>
            </div>
          </div>
          </div>
        </div>
    </div>
  )
}
