import React from 'react';
import Chart from 'react-apexcharts';
import Typography from '@material-ui/core/Typography';
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
    chart: {
      toolbar: {
        show: false,
      },
    },
  };
  const series = [
    {
      name: 'Mileage at MOT',
      data: mileages.map((el) => el.miles).reverse(),
    },
  ];
  const average =
    (mileages[0].miles - mileages[mileages.length - 1].miles) / mileages.length;

  return (
    <div style={{ display: 'grid', alignContent: 'center' }}>
      <Chart
        options={options}
        series={series}
        type="line"
        style={{
          display: 'grid',
          alignContent: 'center',
          margin: 0,
          padding: 0,
        }}
      />
      <Typography
        variant="subtitle2"
        align="center"
        style={{ paddingBottom: '.5rem' }}
      >
        Average yearly mileage : {Math.round(average)}
      </Typography>
    </div>
  );
}
export default React.memo(ChartItem);
