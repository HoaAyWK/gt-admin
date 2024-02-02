import React from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';

import { PopularProduct } from './components';

const PRODUCTS = [
  {
    id: 1,
    name: 'MacBook Air M1 2020',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    totalOrders: 320
  },
  {
    id: 2,
    name: 'ThinkPad X1 Carbon',
    image: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    totalOrders: 297
  },
  {
    id: 3,
    name: 'ThinkPad T14',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    totalOrders: 210
  },
  {
    id: 4,
    name: 'MacBook Pro M1 2020',
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    totalOrders: 189
  },
  {
    id: 5,
    name: 'MacBook Air M2 2022',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    totalOrders: 150
  },
]

const PopularProducts = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='span'>
          Popular Products
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {PRODUCTS.map((product, index) => (
            <PopularProduct key={product.id} product={product} index={index} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PopularProducts;
