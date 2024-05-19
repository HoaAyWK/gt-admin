import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { fDate, fDateN } from '../../../utils/formatTime';

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
  const chartName = 'Income';
  const { slot, income7DaysStats, income30DaysStats } = props;
  const [options, setOptions] = useState(chartOptions);
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const [series7Days, setSeries7Days] = useState(Object.values(income7DaysStats.incomePerDay));
  const [series30Days, setSeries30Days] = useState(Object.values(income30DaysStats.incomePerDay));
  const [sevenDays, setSevenDays] = useState(() =>
    Object.keys(income7DaysStats.incomePerDay).map(day => fDateN(day)));
  const [thirtyDays, setThirtyDays] = useState(() =>
    Object.keys(income30DaysStats.incomePerDay).map(day => fDateN(day)));

  const [series, setSeries] = useState([{
    name: chartName,
    data: series7Days
  }]);

  useEffect(() => {
    if (income7DaysStats && income30DaysStats) {
      setSeries7Days(Object.values(income7DaysStats.incomePerDay));
      setSeries30Days(Object.values(income30DaysStats.incomePerDay));
      setSevenDays(Object.keys(income7DaysStats.incomePerDay).map(day => fDateN(day)));
      setThirtyDays(Object.keys(income30DaysStats.incomePerDay).map(day => fDateN(day)));
    }
  }, [income7DaysStats, income30DaysStats])

  useEffect(() => {
    if (slot === 'month') {
      setOptions((prevState) => ({
        ...prevState,
        colors: [theme.palette.success.main, theme.palette.success[700]],
        xaxis: {
          categories: thirtyDays,
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
                secondary,
                secondary,
                secondary,
                secondary,
                secondary
              ]
            }
          },
          axisBorder: {
            show: true,
            color: line
          },
          tickAmount: 15,
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
      }));
    } else if (slot === 'week') {
      setOptions((prevState) => ({
        ...prevState,
        colors: [theme.palette.success.main, theme.palette.success[700]],
        xaxis: {
        categories: sevenDays,
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
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: 7,
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
    }));
  }
  }, [slot, sevenDays, thirtyDays]);

  useEffect(() => {
    if (slot === 'month') {
      setSeries([
        {
          name: chartName,
          data: series30Days
        }
      ])
    } else if (slot === 'week') {
      setSeries([
        {
          name: chartName,
          data: series7Days
        }
      ])
    }
  }, [slot, series7Days, series30Days]);

  return (
    <div id='chart'>
      <ReactApexChart options={options} series={series} type='area' height={450} />
    </div>
  );
};

export default IncomeChart;
