import React from 'react';

export default function Checkbox({
  name,
  value,
  isSelected,
  onCheckboxChange,
}) {
  return (
    <label htmlFor={value} className="checkbox center">
      <input
        type="checkbox"
        name={value}
        value={value}
        checked={isSelected}
        id={value}
        onChange={onCheckboxChange}
      />
      <div className="check-name">{name}</div>
    </label>
  );
}
