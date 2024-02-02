import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Stack, Typography } from '@mui/material';

import { Label, Cover } from '../../../../../components';
import defaultProductImage from '../../../../../assets/images/default_product_image.png';
import { fCurrency } from '../../../../../utils/formatNumber';
import { COLOR_LIST } from '../../../../../constants/colors';

const ProductVariantCard = ({ variant }) => {
  const { media, color, specifications, price, discount, status } = variant;
  const realPrice = useMemo(() => {
    return price - price * (discount / 100);
  }, [variant]);

  return (
    <Link
      component={RouterLink}
      to={`/admin/product-variants/details/${variant.id}`}
      underline='none'
    >
      <Card sx={{ borderRadius: 1, p: 2, border: (theme) => `1px dashed ${theme.palette.divider}`, boxShadow: 'none' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Cover
            component='img'
            src={media?.[0] ? media[0] : defaultProductImage}
            alt='image'
            sx={{
              width: 76,
              height: 58,
              objectFit: 'cover',
              borderRadius: 1
            }}
            loading='lazy'
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Stack spacing={0.5}>
            <Typography variant='h6' component='span' color='error' textAlign='center'>
              {fCurrency(realPrice)}
            </Typography>
            <Typography variant='body2' color='text.secondary' textAlign='center'>
              <s>{fCurrency(price)}</s>
            </Typography>
            </Stack>
          </Box>
        </Box>
        <Stack spacing={0.5} sx={{ mt: 2 }}>
          <Typography variant='body1' color='text.secondary'>
            Color:
            &nbsp;
            <Typography variant='body1' component='span' color='text.primary'>
              {COLOR_LIST[color]}
            </Typography>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alginItems: 'center'
            }}
          >
            <Typography variant='body1' color='text.secondary'>
              Status: &nbsp;
            </Typography>
            <Label color={status ? 'success' : 'error'}>{status ? 'Available' : 'Unavailable'}</Label>
          </Box>
          <Typography variant='body1' color='text.secondary'>
            Specification:
            &nbsp;
            <Typography variant='body1' component='span' color='text.primary'>
              {specifications}
            </Typography>
          </Typography>
        </Stack>
      </Card>
    </Link>
  );
};

export default ProductVariantCard;
