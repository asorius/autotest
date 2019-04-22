import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import DropItem from './DropItem';
import Context from '../context/context';
import MapComponent from './MapComponent';
import ImgModal from './ImgModal';
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
    let classname =
      e.target.tagName === 'STRONG'
        ? e.target.parentNode.className
        : e.target.className;
    document.querySelectorAll(`.${classname}`).forEach(el => {
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
  const listEntries = Object.entries(rest).length > 0 ? false : true;
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
  if (map === undefined || map.lat === null || map.lng === null) {
    seller_coords = null;
  } else {
    seller_coords = {
      lat: map.lat,
      lng: map.lng
    };
  }
  console.log({ listEntries });
  return (
    <div className="column is-paddingless  is-half-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
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
            <ImgModal images={images} current={current} />
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
              <i>MOT</i> :{' '}
              {events.length > 0 ? events[0].data.expiredate : null}
            </h3>
          </div>
        </div>
        <div className="content ">
          <div
            className={classnames('c media', {
              ' is-invisible': listEntries
            })}
          >
            <div className="div media-left has-text-success">
              <span className="icon is-large">
                <i className="fas fa-car fa-lg" />
              </span>
            </div>
            <div className="media-content">
              {Object.entries(rest).map(el => {
                //rest is our options sent back from the server, like ['acceleration','fast']
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
                    <strong>{name}</strong> :{' '}
                    {el[1] === false || el[1] === null || false ? 'n/a' : el[1]}
                  </li>
                );
              })}
            </div>
          </div>
          <div className="seller media">
            <div className="media-left has-text-warning">
              <span className="icon is-large">
                <i className="fas fa-money-check-alt fa-lg" />
              </span>
            </div>
            <div className="media-content">
              <strong>{seller.name}</strong>
              <br />
              <strong>Contacts</strong> : {seller.phone1}
              {seller.phone2 ? `, ${seller.phone2}` : null}
            </div>
          </div>
          <div className="div">
            {seller_coords ? (
              <MapComponent
                usercoords={context.postcode ? context.postcode : null}
                sellercoords={seller_coords}
                isMarkerShown={true}
              />
            ) : map === undefined ? null : (
              <div className="center">
                <p>
                  <i>Map unavailable due to seller.</i>
                </p>
              </div>
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
                <span className="icon is-small main-arrow">
                  <i className="fas fa-angle-up" aria-hidden="true" />
                </span>
              </button>
            </div>
            <div
              className="dropdown-menu menu-container"
              id="dropdown-menu1"
              role="menu"
            >
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
          <div className="at-link ">
            <a
              className="center"
              href={`${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              AutoTrader Link
              <span className="icon is-medium">
                <i className="fas fa-external-link-alt fa-lg" />
              </span>
            </a>
          </div>
          <div>
            <button className="delete is-large " onClick={removeCar} />
          </div>
        </div>
      </div>
    </div>
  );
}
