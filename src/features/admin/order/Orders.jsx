import React, { useState } from 'react';
import {
  Box,
  Tab,
  LinearProgress
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useSelector } from 'react-redux';

import AllOrderTab from './AllOrdersTab';
import ACTION_STATUS from '../../../constants/actionStatus';

const TABS = [
  { value: 1, label: 'All' },
  { value: 2, label: 'Pending' },
  { value: 3, label: 'Completed' },
  { value: 4, label: 'Cancelled' },
  { value: 4, label: 'Refunded' },
];

const TABLE_HEAD = [
  { id: "orderNumber", label: "Order", align: 'left' },
  { id: "customer", label: "Customer", align: 'left' },
  { id: "createdDateTime", label: "Date", align: 'left' },
  { id: "items", label: "Items", align: 'center' },
  { id: "totalAmount", label: "Total", align: 'center' },
  { id: "orderStatus", label: "Status", align: 'center' },
  { id: "paymentStatus", label: "Payment Status", align: 'center' },
  { id: "", label: "", align: 'left' },
];

const Orders = () => {
  const [tab, setTab] = useState(TABS[0].value);
  const { getOrdersStatus } = useSelector(state => state.orders);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <LinearProgress
          variant='query'
          sx={{ visibility: `${getOrdersStatus === ACTION_STATUS.LOADING ? 'visible' : 'hidden' }` }}
        />
      </Box>
      <Box
        sx={{
          borderRadius: theme => theme.spacing(1),
          border: theme => `1px solid ${theme.palette.divider}`,
          backgroundColor: theme => theme.palette.background.paper
        }}
      >
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label='order-tabs'>
              {TABS.map((tab) => (
                <Tab label={tab.label} key={tab.value} value={tab.value} />
              ))}
            </TabList>
          </Box>
          <TabPanel value={TABS[0].value} sx={{ p: 0 }}>
            <AllOrderTab tableHead={TABLE_HEAD} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Orders;
