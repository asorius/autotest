import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/context';
import Car from './Car';
import InputsForm from './InputsForm'
import { setTimeout } from 'timers';
export default function LandingPage(props) {
  const context = useContext(Context);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    //put list to context on initial render
    localStorage.setItem(
      'atplist',
      JSON.stringify({
        list: context.list,
      })
    );
  }, [context.list]);

  useEffect(() => {
    localStorage.setItem(
      'atpsettings',
      JSON.stringify({
        postcode: context.postcode,
        settings: context.settings,
      })
    );
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, [context.settings, context.postcode]);


  const shareList = (e) => {
    e.preventDefault();
    const urls = context.list.reduce(
      (accumulator, current) => [...accumulator, current.actualLink],
      []
    );
    const data = { key: context.sharekey, list: urls };
    context.saveCarList(data);
  };

  return (
    <div className="main-container">
      <header className="hero is-medium is-light is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">AutoPare</h1>
            <h2 className="subtitle">Expanded AutoTrader car lists</h2>
          </div>
        </div>
      </header>
      <main>
        <InputsForm ></InputsForm>
       
        <section className="columns is-multiline is-paddingless">
          {context.list.map((item) => {
            return <Car key={item._id} item={item} reload={context.postcode} />;
          })}
        </section>
      </main>
      <footer className="footer">
        <div className="contect has-text-centered">
          {context.sharekey !== null ? null : (
            <button className="button" onClick={shareList}>
              Generate sharable link
            </button>
          )}
          {context.sharekey !== null ? (
            <input
              className="input sharelink"
              type="text"
              readOnly
              value={`${window.location.href}${context.sharekey}`}
            />
          ) : null}
        </div>
      </footer>
    </div>
  );
}
