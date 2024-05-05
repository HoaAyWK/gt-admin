import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import { Page } from '../../../components';
import { OrderDetails } from '../../../features/admin/order';

const OrderDetailsPage = () => {
  const { id } = useParams();

  return (
    <Page title='Order Details'>
      <Container maxWidth='xl'>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Box sx={{ mt: 1 }}>
            <OrderDetails id={id} />
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default OrderDetailsPage;
