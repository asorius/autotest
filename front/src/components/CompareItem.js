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

  const { title, price, images, events } = props.item;
  // let seller_coords;
  // if (seller.gmapLink === undefined) {
  //   seller_coords = null;
  // } else {
  //   seller_coords = {
  //     lat: seller.gmapLink.split('&q=')[1].split('%2C')[0],
  //     lng: seller.gmapLink.split('&q=')[1].split('%2C')[1]
  //   };
  // }
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
          <h2 className="subtitle">{price}</h2>
        </div>

        <div className="content has-text-centered">
          {/* <div className="div">
            {seller_coords ? (
              <MapComponent
                usercoords={context.postcode[0] ? context.postcode[0] : null}
                sellercoords={seller_coords}
                isMarkerShown={true}
              />
            ) : null}
          </div> */}
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
                  /////ererora here
                  console.log(item);
                  let mileage =
                    parseFloat(item.data.mileage) -
                    parseFloat(item[index + 1].data.mileage);
                  if (index === 4) {
                    mileage = ' - ';
                  }
                  return (
                    <DropItem
                      item={item}
                      driven={mileage}
                      key={Math.random()}
                      index={index}
                    />
                  );
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
