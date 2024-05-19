import React, { useState, useEffect } from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

import { Iconify } from '../../../../components';

const StyledIconBox = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
}));

const chartOptions = {
  chart: {
    height: 100,
    type: 'line',
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true
    }
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

const StatCard = ({ label, total, isIncreased, comparingValue, data }) => {
  const [options, setOptions] = useState(chartOptions);
  const theme = useTheme();

  const [series, setSeries] = useState([{
    name: 'Income',
    data: data
  }]);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      colors: [theme.palette.primary.main, theme.palette.primary.main[700]],
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      },
      tooltip: {
        theme: 'light',
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          },
        },
        marker: {
          show: false
        }
      }
    }))
  }, []);

  return (
    <Card sx={{ borderRadius: (theme) => theme.spacing(1) }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Stack spacing={1} sx={{ flexShrink: 0 }}>
            <Typography variant='subtitle1' component='span' color='text.primary'>
              {label}
            </Typography>
            <Typography variant='h4' component='span'>{total}</Typography>
            {isIncreased ? (
              <Stack spacing={1} direction='row' alignItems='center'>
                <StyledIconBox
                  sx={{
                    backgroundColor: (theme) => `${alpha(theme.palette.success.main, 0.16)}`,
                    color: (theme) => `${theme.palette.success.main}`,
                  }}
                >
                  <Iconify icon='material-symbols:trending-up-rounded' width={20} height={20} />
                </StyledIconBox>
                <Typography color='text.primary' variant='subtitle2'>
                  {comparingValue !== 'NaN' ? Math.ceil(comparingValue) : 0}%
                  <Typography color='text.secondary' variant='body2' component='span'>
                    &nbsp; than last week
                  </Typography>
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={1} direction='row' alignItems='center'>
                <StyledIconBox
                  sx={{
                    backgroundColor: (theme) => `${alpha(theme.palette.error.main, 0.16)}`,
                    color: (theme) => `${theme.palette.error.main}`,
                  }}
                >
                  <Iconify icon='ic:round-trending-down' width={20} height={20} />
                </StyledIconBox>
                <Typography color='text.primary' variant='subtitle2'>
                  {comparingValue !== 'NaN' ? Math.ceil(comparingValue) : 0}%
                  <Typography color='text.secondary' variant='body2' component='span'>
                    &nbsp; than last week
                  </Typography>
                </Typography>
              </Stack>
            )}
          </Stack>
          <Box sx={{ maxWidth: 150 }}>
            <ReactApexChart options={options} series={series} type='line' height={100} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
