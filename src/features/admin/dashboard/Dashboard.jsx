import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, Typography, Stack, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

import { Page } from '../../../components';
import { StatCard } from './components';
import IncomeChart from './IncomeChart';
import PopularProducts from './popular-products';
import {
  getOrderStats,
  getCustomerStats,
  get7DaysIncomeStats,
  get30DaysIncomeStats
} from './statsSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import RecentOrders from './recent-orders';

const SLOT_OPTIONS = {
  WEEK: 'week',
  MONTH: 'month'
};

const ButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  '&:hover': {
      backgroundColor: theme.palette.success.main,
  },
  color: '#fff'
}));

const Dashboard = () => {
  const fromDay =  7;
  const [slotArea, setSlotArea] = useState(SLOT_OPTIONS.WEEK);
  const dispatch = useDispatch();
  const {
    orderStats,
    getOrderStatsStatus,
    customerStats,
    getCustomerStatsStatus,
    getIncome7DaysStatsStatus,
    income7DaysStats,
    getIncome30DaysStatsStatus,
    income30DaysStats
  } = useSelector((state) => state.stats);

  useEffect(() => {
    if (getOrderStatsStatus === ACTION_STATUS.IDLE) {
      dispatch(getOrderStats(fromDay));
    }

    if (getCustomerStatsStatus === ACTION_STATUS.IDLE) {
      dispatch(getCustomerStats(fromDay));
    }

    if (getIncome7DaysStatsStatus === ACTION_STATUS.IDLE) {
      dispatch(get7DaysIncomeStats());
    }

    if (getIncome30DaysStatsStatus === ACTION_STATUS.IDLE) {
      dispatch(get30DaysIncomeStats());
    }
  }, []);

  return (
    <Box sx={{ mb: 4, px: 1, overflow: 'hidden' }}>
      <Page title='Dashboard'>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              {orderStats ? (
                <StatCard
                  label="Total Orders"
                  total={orderStats.totalOrders}
                  comparingValue={orderStats.compareToPreviousDays}
                  isIncreased={orderStats.isIncreased}
                  data={orderStats.ordersPerDay}
                />
              ) : (
                <Skeleton variant="rounded">
                  <StatCard />
                </Skeleton>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {customerStats ? (
                <StatCard
                  label="Total Customers"
                  total={customerStats.totalCustomers}
                  comparingValue={customerStats.compareToPreviousDays}
                  isIncreased={customerStats.isIncreased}
                  data={customerStats.customerRegistersPerDay}
                />
              ) : (
                <Skeleton variant="rounded">
                  <StatCard />
                </Skeleton>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {income7DaysStats ? (
                <StatCard
                  label="Total Income"
                  total={income7DaysStats.totalIncome}
                  comparingValue={income7DaysStats.compareToPreviousDays}
                  isIncreased={income7DaysStats.isIncreased}
                  data={Object.values(income7DaysStats.incomePerDay)}
                />
              ) : (
                <Skeleton variant="rounded">
                  <StatCard />
                </Skeleton>
              )}
            </Grid>
          </Grid>
          {income7DaysStats && income30DaysStats ? (
            <Card sx={{ my: 4, pt: 2, borderRadius: (theme) => theme.spacing(1) }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 2
                }}
              >
                <Typography variant='h4' component='span' color='text.primary'>
                  Income
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: '$fff' }}>
                  {slotArea === SLOT_OPTIONS.WEEK ? (
                    <ButtonStyle
                      size="small"
                      onClick={() => setSlotArea(SLOT_OPTIONS.WEEK)}
                      variant='contained'
                    >
                      Last Week
                    </ButtonStyle>
                  ) : (
                    <Button
                      size='small'
                      onClick={() => setSlotArea(SLOT_OPTIONS.WEEK)}
                      color='success'
                      variant='text'
                    >
                      Last Week
                    </Button>
                  )}
                  {slotArea === SLOT_OPTIONS.MONTH ? (
                    <ButtonStyle
                      size="small"
                      onClick={() => setSlotArea(SLOT_OPTIONS.MONTH)}
                      variant='contained'
                    >
                      Last Month
                    </ButtonStyle>
                  ) : (
                    <Button
                      size='small'
                      onClick={() => setSlotArea(SLOT_OPTIONS.MONTH)}
                      color='success'
                      variant='text'
                    >
                      Last Month
                    </Button>
                  )}
                </Stack>
              </Box>
              <IncomeChart
                slot={slotArea}
                income7DaysStats={income7DaysStats}
                income30DaysStats={income30DaysStats}
              />
            </Card>
          ) : (
            <Skeleton variant="rectangular" sx={{ height: 480 }} />
          )}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={7}>
              <RecentOrders />
            </Grid>
            <Grid item xs={12} md={5}>
              <PopularProducts />
            </Grid>
          </Grid>
        </Box>
      </Page>
    </Box>
  );
};

export default Dashboard;
