import React, { useEffect, useMemo } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners, selectAllBanners } from './bannerSlice';
import { BANNER_POSITION } from '../../../constants/banner';
import ACTION_STATUS from '../../../constants/actionStatus';


const MainBannerList = ({ onOpenAddDialog }) => {
  const dispatch = useDispatch();
  const banners = useSelector(selectAllBanners);
  const { getBannersStatus } = useSelector((state) => state.adminBanners);

  useEffect(() => {
    if (getBannersStatus === ACTION_STATUS.IDLE) {
      dispatch(getBanners());
    }
  }, [getBannersStatus]);

  const mainBanners = useMemo(() => {
    return banners.filter((banner) => banner?.field === BANNER_POSITION.MAIN);
  }, [banners]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography variant='h4' component='h1' color='text.primary'>
          Slide banners
        </Typography>
        <Button variant='contained' color='primary' onClick={onOpenAddDialog}>Add</Button>
      </Box>
      <Grid container spacing={2}>
        {mainBanners.map((banner) => (
          <Grid item xs={12} sm={6} md={4} key={banner?.id}>
            <Banner image={banner?.image} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MainBannerList;
