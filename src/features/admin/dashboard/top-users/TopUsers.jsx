import React from 'react';

import { TopUser } from './components';
import { Card, CardContent, Stack, Typography } from '@mui/material';

const USERS = [
  {
    firstName: 'Lucas',
    lastName: 'Steve',
    numOrders: 21,
    totalSpend: 3600
  },
  {
    firstName: 'Sam',
    lastName: 'Feldt',
    numOrders: 19,
    totalSpend: 3284
  },
  {
    firstName: 'Justin',
    lastName: 'Mylo',
    numOrders: 17,
    totalSpend: 2981
  },
  {
    firstName: 'Mike',
    lastName: 'Williams',
    numOrders: 16,
    totalSpend: 2800
  },{
    firstName: 'David',
    lastName: 'Brooks',
    numOrders: 15,
    totalSpend: 2500
  }
];

const TopUsers = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='span'>
          Top Users
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {USERS.map((user) => (
            <TopUser key={user.totalSpend} user={user} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TopUsers;
