import React from 'react';
import { Alert, Box } from '@mui/material'

const FetchDataErrorMessage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        mt: 4
      }}
    >
      <Alert severity='error'>Error when fetching data.</Alert>
    </Box>
  );
};

export default FetchDataErrorMessage;
