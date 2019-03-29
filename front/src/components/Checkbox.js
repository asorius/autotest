import React from 'react';

export default function Checkbox(props) {
  const { list } = props;
  const setChecked = props.check;
  return (
    <React.Fragment>
      {list.map(el => (
        <label htmlFor={el} className="checkbox" key={Math.random()}>
          <input type="checkbox" name={el} id={el} onChange={setChecked} />
          {el}
        </label>
      ))}
    </React.Fragment>
  );
}
