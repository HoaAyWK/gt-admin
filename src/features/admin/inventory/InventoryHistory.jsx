import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { fDateTime } from '../../../utils/formatTime';
import { WAREHOUSE_HISTORY_TYPE } from '../../../constants/warehouse';
import ACTION_STATUS from '../../../constants/actionStatus';
import { FetchDataErrorMessage, Loading } from '../components';

const InventoryHistory = ({ histories, selectedProduct, inventories, status }) => {
  if (status === ACTION_STATUS.IDLE ||
      status === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (status === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <Box sx={{ px: 1 }}>
      <Stack spacing={0.5}>
        <Typography variant='subtitle1'>Product ID</Typography>
        <Typography variant='h5' component='h1' color='text.primary'>
          {selectedProduct ? selectedProduct : inventories[0]?.productId }
        </Typography>
      </Stack>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {histories.map((ih) => (
          <Box
            key={ih.createdAt}
            sx={{
              display: 'flex',
              alginItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='body1'>{fDateTime(ih.createdAt)}</Typography>
            <Typography variant='body1'>{`${ih.type === WAREHOUSE_HISTORY_TYPE.PLUS ? '+' : '-'}${ih.quantity}`}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default InventoryHistory;
