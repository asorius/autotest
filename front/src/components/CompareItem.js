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
  const sethover = e => {
    document.querySelectorAll(`.${e.target.className}`).forEach(el => {
      el.classList.add('hover');
    });
  };
  const unsethover = e => {
    document.querySelectorAll(`.${e.target.classList[0]}`).forEach(el => {
      el.classList.remove('hover');
    });
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
  const [current, incrementImg] = useState(0);
  const [img, setImg] = useState(images[current]);
  const changeImg = e => {
    e.preventDefault();
    if (e.target.classList.contains('next')) {
      if (current + 1 <= images.length - 1) {
        setImg(images[current + 1]);
        incrementImg(current + 1);
      }
    }
    if (e.target.classList.contains('prev')) {
      if (current - 1 >= 0) {
        setImg(images[current - 1]);
        incrementImg(current - 1);
      }
    }
  };
  let seller_coords;
  if (map === undefined) {
    seller_coords = null;
  } else {
    seller_coords = {
      lat: map.lat,
      lng: map.lng
    };
  }
  return (
    <div className="column is-paddingless ">
      <div className="card">
        <div className="card-image">
          <figure className="image ">
            <img src={img} alt="Car" />
          </figure>
          <div className="buttons">
            <button className="button prev" onClick={changeImg}>
              <span className="icon is-small prev">
                <i className="fas fa-angle-left prev" />
              </span>
            </button>
            <div className="current">
              <span className="txt">
                {current + 1} / {images.length}
              </span>
            </div>
            <button className="button next" onClick={changeImg}>
              <span className="icon is-small next">
                <i className="fas fa-angle-right next" />
              </span>
            </button>
          </div>
        </div>
        <div className="card-content">
          <h2 className="title is-size-3 car-title">{title}</h2>
          <div className="subs">
            <h2 className="subtitle1 is-size-4">{price}</h2>
            <h3 className="subtitle2">
              MOT : {events.length > 0 ? events[0].data.expiredate : null}
            </h3>
          </div>
        </div>
        <div className="content has-text-centered">
          <div className="c">
            {Object.entries(rest).map(el => {
              //rest is our options sent back from the server, each el looks like ['acceleration','fast']
              //loops through user-set options stored in context to get full definition,matches them with according values from data from the server and returns li
              let name = context.options.filter(opt => opt.value === el[0])[0]
                .name;
              let classname = context.options.filter(
                opt => opt.value === el[0]
              )[0].value;
              return (
                <li
                  className={classname}
                  key={Math.random()}
                  onMouseEnter={sethover}
                  onMouseLeave={unsethover}
                >
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
                usercoords={context.postcode ? context.postcode : null}
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
            className={classnames('dropdown is-up ', {
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
            <div className="dropdown-menu " id="dropdown-menu1" role="menu">
              <div className="dropdown-content">
                {events || events.length < 0
                  ? events.map((item, index) => {
                      if (index < 5) {
                        const newestmiles = parseFloat(item.data.mileage);
                        const milesbefore = events[index + 1]
                          ? parseFloat(events[index + 1].data.mileage)
                          : 0;
                        let mileage =
                          milesbefore === 0
                            ? 'First MOT'
                            : newestmiles - milesbefore;

                        return (
                          <DropItem
                            item={item}
                            driven={mileage}
                            key={Math.random()}
                            index={index}
                          />
                        );
                      }
                    })
                  : null}
              </div>
            </div>
          </div>

          <div>
            <button className="delete is-large " onClick={removeCar} />
          </div>
        </div>
      </div>
    </div>
  );
}
