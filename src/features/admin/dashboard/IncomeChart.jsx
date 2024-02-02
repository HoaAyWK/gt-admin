import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const chartOptions = {
  chart: {
    height: 450,
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
    strokeDashArray: 2
  },

};

const IncomeChart = (props) => {
  const [options, setOptions] = useState(chartOptions);
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

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
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }))
  }, []);

  return (
    <div id='chart'>
      <ReactApexChart options={options} series={series} type='area' height={450} />
    </div>
  );
};

export default IncomeChart;
