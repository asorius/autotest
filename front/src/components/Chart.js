import React, { useState } from 'react';
import Charts from 'react-apexcharts';
export default function Chart({ mileages }) {
  const [options, setOptions] = useState({
    xaxis: {
      categories: mileages.map(el => el.year).reverse()
    },
    markers: {
      size: 5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [`#ADD${Math.round(Math.random() * 1000)}`]
      }
    }
  });
  const [series, setSeries] = useState([
    {
      name: 'Mileage at MOT',
      data: mileages.map(el => el.miles).reverse()
    }
  ]);
  const average =
    (mileages[0].miles - mileages[mileages.length - 1].miles) / mileages.length;

  return (
    <div>
      <Charts options={options} series={series} type="line" />
      <h4>Average yearly mileage : {Math.round(average)}</h4>
    </div>
  );
}
