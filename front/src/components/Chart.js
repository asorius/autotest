import React, { useState } from 'react';
import Charts from 'react-apexcharts';
export default function Chart({ mileages }) {
  const [options, setOptions] = useState({
    xaxis: {
      categories: mileages.map(el => el.year).reverse()
    }
  });
  const [series, setSeries] = useState([
    {
      name: 'Mileage at MOT',
      data: mileages.map(el => el.miles).reverse()
    }
  ]);
  console.log(mileages);
  return (
    <div>
      <Charts options={options} series={series} type="line" />
    </div>
  );
}
