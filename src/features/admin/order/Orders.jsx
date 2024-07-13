import React, { useState } from 'react';
import {
  Box,
  Tab,
  LinearProgress
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useSelector } from 'react-redux';

import {
  AllOrdersTab,
  PendingOrdersTab,
  ProcessingOrdersTab,
  CompletedOrdersTab,
  CancelledOrdersTab,
  RefundedOrdersTab
} from './order-tabs';
import ACTION_STATUS from '../../../constants/actionStatus';

const TABS = [
  { value: 1, label: 'All' },
  { value: 2, label: 'Pending' },
  { value: 3, label: 'Processing' },
  { value: 4, label: 'Completed' },
  { value: 5, label: 'Cancelled' },
  { value: 6, label: 'Refunded' },
];

const TABLE_HEAD = [
  { id: "orderNumber", label: "Order", align: 'left', isSortable: true },
  { id: "customer", label: "Customer", align: 'left' },
  { id: "createdDateTime", label: "Date", align: 'left', isSortable: true },
  { id: "items", label: "Items", align: 'center', isSortable: true },
  { id: "totalAmount", label: "Total", align: 'center', isSortable: true },
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
            <AllOrdersTab tableHead={TABLE_HEAD} />
          </TabPanel>
          <TabPanel value={TABS[1].value} sx={{ p: 0 }}>
            <PendingOrdersTab tableHead={TABLE_HEAD} />
          </TabPanel>
          <TabPanel value={TABS[2].value} sx={{ p: 0 }}>
            <ProcessingOrdersTab tableHead={TABLE_HEAD} />
          </TabPanel>
          <TabPanel value={TABS[3].value} sx={{ p: 0 }}>
            <CompletedOrdersTab tableHead={TABLE_HEAD} />
          </TabPanel>
          <TabPanel value={TABS[4].value} sx={{ p: 0 }}>
            <CancelledOrdersTab tableHead={TABLE_HEAD} />
          </TabPanel>
          <TabPanel value={TABS[5].value} sx={{ p: 0 }}>
            <RefundedOrdersTab tableHead={TABLE_HEAD} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Orders;
