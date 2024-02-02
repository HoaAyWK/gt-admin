import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import InventoryList from './InventoryList';
import InventoryHistory from './InventoryHistory';
import { getInventories, selectAllInventories, getWarehouseHistory } from './inventorySlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import { FetchDataErrorMessage, Loading } from '../components';

const Inventory = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const inventories = useSelector(selectAllInventories);
  const { getInventoriesStatus, warehouseHistory, getWarehouseHistoryStatus } = useSelector((state) => state.adminInventories);

  useEffect(() => {
    if (getInventoriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getInventories());
    }
  }, []);


  useEffect(() => {
    if (selectedProduct) {
      dispatch(getWarehouseHistory(selectedProduct));
    } else {
      if (inventories.length > 0) {
        dispatch(getWarehouseHistory(inventories[0].productId));
      }
    }
  }, [selectedProduct]);

  const handleSelectProduct = (id) => {
    setSelectedProduct(id);
  };

  if (getInventoriesStatus === ACTION_STATUS.IDLE ||
      getInventoriesStatus === ACTION_STATUS.LOADING) {
    return (
      <Loading />
    );
  }

  if (getInventoriesStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <InventoryList
          inventories={inventories}
          selectedProduct={selectedProduct}
          onSelectProduct={handleSelectProduct}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <InventoryHistory
          inventories={inventories}
          histories={warehouseHistory}
          selectedProduct={selectedProduct}
          status={getWarehouseHistoryStatus}
        />
      </Grid>
    </Grid>
  );
};

export default Inventory;
