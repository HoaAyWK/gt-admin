import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const chartOptions = {
  chart: {
    height: 100,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    show: false
  },
};

const StatChart = (props) => {
  const [options, setOptions] = useState(chartOptions);
  const theme = useTheme();

  const [series, setSeries] = useState([{
    name: 'Income',
    data: [
      435,
      560,
      790,
      600,
      420,
      840,
      750
    ]
  }]);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      colors: [theme.palette.primary.main, theme.palette.primary.main[700]],
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        labels: {
          show: false
        },
        axisBorder: {
          show: false,
        },
        tickAmount: 0
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        theme: 'light',
      }
    }))
  }, []);

  return (
    <div id='stat-chart'>
      <ReactApexChart options={options} series={series} type='area' height={100} />
    </div>
  );
};

export default StatChart;
