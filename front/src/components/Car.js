import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import MotEvent from './secondary/MotEvent';
import Context from '../context/context';
import Map from './secondary/Map';
import ImgModal from './secondary/ImgModal';
import ChartItem from './secondary/ChartItem';
export default function Car(props) {
  const context = useContext(Context);
  const [drop, setDrop] = useState(false);
  const [miles, showMiles] = useState(false);
  const toggleDrop = (e) => {
    e.preventDefault();
    setDrop(!drop);
  };
  const removeCar = (e) => {
    e.preventDefault();
    context.removeCarFromList(props.item._id);
  };
  const sethover = (e) => {
    let classname =
      e.target.tagName === 'STRONG'
        ? e.target.parentNode.className
        : e.target.className;
    //remove hover class from other elements before adding it to currently hovered
    document.querySelectorAll('.hover').forEach((el) => {
      el.classList.remove('hover');
    });
    document.querySelectorAll(`.${classname}`).forEach((el) => {
      el.classList.add('hover');
    });
  };
  const unsethover = (e) => {
    document.querySelectorAll(`.${e.target.classList[0]}`).forEach((el) => {
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
    actualLink,
    url,
    addedDate,
    dealerLink,
    mileageDataForDisplay,
    ...rest
  } = props.item;
  const listEntries = Object.entries(rest).length > 0 ? false : true;
  const [current, setCurrentImg] = useState(0);
  const [img, setImg] = useState(images[current]);
  const changeImg = (e, fromsmall) => {
    e.preventDefault();
    setCurrentImg(fromsmall);
    if (e.target.classList.contains('next')) {
      if (current + 1 <= images.length - 1) {
        setImg(images[current + 1]);
        setCurrentImg(current + 1);
      } else {
        setImg(images[0]);
        setCurrentImg(0);
      }
    }
    if (e.target.classList.contains('prev')) {
      if (current - 1 >= 0) {
        setImg(images[current - 1]);
        setCurrentImg(current - 1);
      } else {
        setImg(images[images.length - 1]);
        setCurrentImg(images.length - 1);
      }
    }
  };
  let seller_coords;
  if (map === undefined || map.lat === null || map.lng === null) {
    seller_coords = null;
  } else {
    seller_coords = {
      lat: map.lat,
      lng: map.lng,
    };
  }
  return (
    <div className="column is-paddingless  is-half-tablet  is-one-third-widescreen is-one-third-fullhd">
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
            <ImgModal
              images={images}
              current={current}
              smallImgChange={changeImg}
            />
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
              <strong>
                <i>MOT</i>
              </strong>{' '}
              : {events.length > 0 ? events[0].data.expiredate : null}
            </h3>
          </div>
        </div>
        <div className="content ">
          <div
            className={classnames('c media', {
              ' is-invisible': listEntries,
            })}
          >
            <div className="div media-left has-text-success">
              <span className="icon is-large">
                <i className="fas fa-car fa-lg" />
              </span>
            </div>
            <div className="media-content">
              {Object.entries(rest).map((el) => {
                //rest is our options sent back from the server, like ['acceleration','fast']
                //loops through user-set options stored in context to get full definition,matches them with according values from data from the server and returns li
                let name = context.options.filter(
                  (opt) => opt.value === el[0]
                )[0].name;
                let classname = context.options.filter(
                  (opt) => opt.value === el[0]
                )[0].value;
                return (
                  <li
                    className={classname}
                    key={Math.random()}
                    onMouseEnter={sethover}
                    onMouseLeave={unsethover}
                  >
                    <strong>{name}</strong> :{' '}
                    {el[1] === false || el[1] === null || false
                      ? 'Unavailable'
                      : el[1]}
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
              {dealerLink ? (
                <strong>
                  <a
                    className="at-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={dealerLink}
                  >
                    {seller.name}
                  </a>
                </strong>
              ) : (
                <strong>{seller.name}</strong>
              )}
              <br />
              <strong>Contacts</strong> : {seller.phone1}
              {seller.phone2 ? `, ${seller.phone2}` : null}
              {addedDate ? (
                <React.Fragment>
                  <br />
                  <strong>Advert added : </strong>
                  {addedDate.substring(0, 4)} {addedDate.substring(4, 6)}{' '}
                  {addedDate.substring(6, 8)}
                </React.Fragment>
              ) : null}
            </div>
          </div>
          <div className="div">
            {seller_coords ? (
              <Map
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
        <div className="content" style={{ textAlign: 'center' }}>
          <button
            className="button "
            onClick={() => {
              showMiles(!miles);
            }}
          >
            {miles ? 'Hide' : 'Show'} available mileage history
          </button>

          {miles ? (
            <ChartItem mileages={mileageDataForDisplay}></ChartItem>
          ) : null}
        </div>
        <div className="card-footer">
          <div
            className={classnames('dropdown is-up ', {
              'is-active': drop,
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
                          <MotEvent
                            item={item}
                            driven={mileage}
                            key={Math.random()}
                            index={index}
                          />
                        );
                      }
                      return null;
                    })
                  : null}
              </div>
            </div>
          </div>
          <div className="center">
            <a
              className="at-link"
              href={`${actualLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on AutoTrader
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