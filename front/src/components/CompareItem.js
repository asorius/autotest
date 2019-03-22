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

  const { mainData: data, events: motHistory, keyFacts: info } = props.item;
  const { sellerInfo: seller } = data;
  const seller_coords = {
    lat: seller.gmapLink.split('&q=')[1].split('%2C')[0],
    lng: seller.gmapLink.split('&q=')[1].split('%2C')[1]
  };

  return (
    <div className="tile is-child box is-4">
      <div className="card">
        <div className="card-image">
          <figure className="image ">
            <img src={data.images[0]} alt="Car" />
          </figure>
        </div>
        <div className="card-content">
          <h2 className="title">{data.title}</h2>
          <h2 className="subtitle">{data.price}</h2>
        </div>

        <div className="content has-text-centered">
          <div className="columns">
            <div className="about-car column">
              <div className="about-car-title">Car details: </div>
              <ul>
                {props.item.writeOffCategory ? (
                  <abbr title="Category">
                    <i class="fas fa-car-crash" /> :{' '}
                    {props.item.writeOffCategory}
                  </abbr>
                ) : null}
                <li>
                  <abbr title="Manufactured year">
                    <i className="far fa-calendar-alt" /> :{' '}
                    {info['manufactured-year']}
                  </abbr>
                </li>
                <li>
                  <abbr title="Engine size">
                    <i className="fas fa-oil-can" /> : {info['engine-size']}
                  </abbr>
                </li>
                <li>
                  <abbr title="Mileage">
                    <i className="fas fa-road" /> : {info.mileage}
                  </abbr>
                </li>
                <li>
                  <abbr title="Expires at">
                    {' '}
                    MOT : {motHistory[0].data['expiry_date']}
                  </abbr>
                </li>
                <li>
                  <abbr title="Fuel type">
                    <i className="fas fa-gas-pump" /> : {info['fuel-type']}
                  </abbr>
                </li>
                <li>
                  <abbr title="Transmission type">
                    <i className="fas fa-truck-monster" /> : {info.transmission}
                  </abbr>
                </li>
                <li>
                  <abbr title="Tax">
                    {' '}
                    <i className="fas fa-hand-holding-usd" /> : {props.item.tax}
                  </abbr>
                </li>
                <li>
                  <abbr title="Part Exchange">
                    {' '}
                    <i className="fas fa-exchange-alt" /> :{' '}
                    {props.item.partEx ? 'Available' : 'Unavailable'}
                  </abbr>
                </li>
              </ul>
            </div>
            <div className="about-seller column">
              <div className="about-seller-title">About Seller :</div>
              <ul>
                <li>{seller.name}</li>
                <li>{seller.trader ? 'Trader' : 'Private'}</li>
                <li>
                  Contacts:{seller.phone1} , {seller.phone2}
                </li>
              </ul>
            </div>
          </div>
          <div className="div">
            <MapComponent
              usercoords={context.postcode ? context.postcode : null}
              sellercoords={seller_coords}
            />
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
                {motHistory.map((item, index) => {
                  if (index < 5) {
                    let mileage =
                      item.data.mileageData.value -
                      motHistory[index + 1].data.mileageData.value;
                    if (index === 5) {
                      mileage = ' - ';
                    }
                    return (
                      <DropItem
                        item={item}
                        driven={mileage}
                        key={item.data.test_number}
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
