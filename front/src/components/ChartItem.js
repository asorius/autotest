import React from 'react';
import Chart from 'react-apexcharts';
function ChartItem({ mileages }) {
  const options = {
    xaxis: {
      categories: mileages.map((el) => el.year).reverse(),
    },
    markers: {
      size: 5,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [`#ADD${Math.round(Math.random() * 1000)}`],
      },
    },
  };
  const series = [
    {
      name: 'Mileage at MOT',
      data: mileages.map((el) => el.miles).reverse(),
    },
  ];
  console.log({ series });
  const average =
    (mileages[0].miles - mileages[mileages.length - 1].miles) / mileages.length;

  return (
    <div>
      <Chart options={options} series={series} type="line" />
      <h4>Average yearly mileage : {Math.round(average)}</h4>
    </div>
  );
}
export default React.memo(ChartItem);
