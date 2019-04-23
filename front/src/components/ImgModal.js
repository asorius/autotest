import React, { useState } from 'react';
import classnames from 'classnames';
export default function ImgModal({ images, current: currentImg }) {
  const [modal, setModal] = useState(false);
  const [current, incrementImg] = useState(0);
  const [img, setImg] = useState(images[current]);
  const openModal = e => {
    incrementImg(currentImg);
    setImg(images[currentImg]);
    setModal(!modal);
  };

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
  return (
    <div className=" center">
      <div className="img-magnify" onClick={openModal}>
        <span className="icon is-large">
          <i className="fas fa-search-plus fa-4x" aria-hidden="true" />
        </span>
      </div>

      <div className={classnames('modal', { 'is-active': modal })}>
        <div className="modal-background" />
        <div className="modal-content img-mdl">
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
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={openModal}
        />
      </div>
    </div>
  );
}
