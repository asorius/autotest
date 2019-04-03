import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import DropItem from './DropItem';
import Context from '../context/context';
import MapComponent from './MapComponent';

export default function CompareItem(props) {
  const [drop, setDrop] = useState(false);
  const context = useContext(Context);
  const toggleDrop = e => {
    e.preventDefault();
    setDrop(!drop);
  };
  const removeCar = e => {
    e.preventDefault();
    context.removeCarFromList(props.item._id);
  };

  const {
    title,
    price,
    images,
    events,
    seller,
    _id,
    map,
    url,
    ...rest
  } = props.item;
  let seller_coords;
  if (map === undefined ) {
    seller_coords = null;
  } else {
    seller_coords = {
      lat: map.lat,
      lng: map.lng
    };
  }
  return (
    <div className="tile is-child box is-4">
      <div className="card">
        <div className="card-image">
          <figure className="image ">
            <img src={images[0]} alt="Car" />
          </figure>
        </div>
        <div className="card-content">
          <h2 className="title">{title}</h2>
          <div className="subs">
            <h2 className="subtitle">{price}</h2>
            <h3 className="subtitle2">MOT until:{events[0].data.expiredate}</h3>
          </div>
        </div>

        <div className="content has-text-centered">
          <div className="c">
          
            {Object.entries(rest).map(el => {
              //rest is our options sent back from the server, each el looks like ['acceleration','fast'] 
              //loops through user-set options stored in context to get full definition,matches them with according values from data from the server and returns li
              let name = context.options.filter(opt => opt.value === el[0])[0]
                .name;
              return (
                <li key={Math.random()}>
                  {name}:
                  {el[1] === false || el[1] === null || false ? 'n/a' : el[1]}
                </li>
              );
            })}
          </div>
          <div className="seller">
            {seller.name}
            <br />
            Contacts:
            <br />
            {seller.phone1}
            <br />
            {seller.phone2}
          </div>
          <div className="div">
            {seller_coords ? (
              <MapComponent
                usercoords={context.postcode[0] ? context.postcode[0] : null}
                sellercoords={seller_coords}
                isMarkerShown={true}
              />
            ) : map === undefined ? null : (
              <div>map unavailable due to selller</div>
            )}
          </div>
        </div>

        <div className="card-footer">
          <div
            className={classnames('dropdown is-up', {
              'is-active': drop
            })}
          >
            <div className="dropdown-trigger">
              <button
                onClick={toggleDrop}
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu1"
              >
                <span>MOT history</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-up" aria-hidden="true" />
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu1" role="menu">
              <div className="dropdown-content">
                {events.map((item, index) => {
                  if (index < 5) {
                    const newestmiles = parseFloat(item.data.mileage);
                    const milesbefore = events[index + 1]?parseFloat(
                      events[index + 1].data.mileage
                    ):0
                    let mileage = milesbefore===0?('First MOT'): newestmiles - milesbefore;

                    return (
                      <DropItem
                        item={item}
                        driven={mileage}
                        key={Math.random()}
                        index={index}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div>
            <button className="delete is-large" onClick={removeCar} />
          </div>
        </div>
      </div>
    </div>
  );
}
