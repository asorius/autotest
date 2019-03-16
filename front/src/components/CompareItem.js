import React, {useState} from 'react'
import classnames from 'classnames'
import DropItem from './DropItem'
export default function CompareItem(props) {
  const [drop,setDrop]=useState(false)
  const toggleDrop=(e)=>{
    e.preventDefault()
    setDrop(!drop)
  }
  const {mainData:data,events:motHistory,keyFacts:info}=props.item;
  const {sellerInfo:seller}=data;

  return (
    
    <div className='tile is-child box is-4'>
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={data.images[0]} alt="Car"/>
            </figure>
          </div>
          <div className="card-content">
            <h2>{data.title}</h2>
            <h2>{data.price}</h2>
          </div>

          <div className="content">
             <div className='about-car'>
             <ul>
               {props.item.writeOffCategory?(<li>
                 CAT:{props.item.writeOffCategory}
               </li>):null}
             <li>
             <i class="far fa-calendar-alt"></i> : {info['manufactured-year']}
               </li>
               <li>
               <i class="fas fa-oil-can"></i> : {info['engine-size']}
               </li>
               <li>
               <i class="fas fa-road"></i> : {info.mileage}
               </li>
               <li>
               <i class="fas fa-gas-pump"></i> : {info['fuel-type']}
               </li>
               <li>
               <i class="fas fa-truck-monster"></i> : {info.transmission}
               </li>
               <li>
               <i class="fas fa-hand-holding-usd"></i> : {props.item.tax}
               </li>
             </ul>
             </div>
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
                {motHistory.map((item,index) => {

                  if(index<5){
                    let mileage
                    if(index===0){ 
                      mileage=parseInt(item.data.mileage)-parseInt(motHistory[index+1].data.mileage)
                    }else{
                      mileage=parseInt(item.data.mileage)-parseInt(motHistory[index+1].data.mileage)
                    }
                  return <DropItem item={item} driven={mileage} key={item.data.test_number}></DropItem>
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
