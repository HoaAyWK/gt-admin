import React from 'react';
import { Paper, Typography } from '@mui/material';

const EmptyRow = ({ other }) => {
  return (
    <Paper {...other}>
        <Typography gutterBottom align="center" variant="subtitle1">
            Oops!
        </Typography>
        <Typography variant="body2" align="center">
            There is no data to display.
        </Typography>
    </Paper>
);
};

export default EmptyRow;
