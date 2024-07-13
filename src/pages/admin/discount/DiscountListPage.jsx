import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { DiscountList, DiscountForm } from '../../../features/admin/discount';
import { createDiscount } from '../../../features/admin/discount/discountSlice';
import PATHS from '../../../constants/paths';


const breadcrumbs = [
  { label: 'Dashboard', path: PATHS.DASHBOARD },
  { label: 'Discounts', path: PATHS.DISCOUNTS },
  { label: 'List' },
];

const DiscountListPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { createDiscountStatus } = useSelector((state) => state.discounts);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };


  return (
    <AdminPageLayout
      pageTitle='Discounts'
      pageHeaderName='Discounts'
      showCreateButton={true}
      createWithDialog={true}
      createName='Discount'
      onOpenDialog={handleOpenDialog}
      breadcrumbs={breadcrumbs}
    >
      <DiscountList />
      <DiscountForm
        dialogTitle='Create Discount'
        dialogContent='Create a new discount'
        isEdit={false}
        open={openDialog}
        handleClose={handleCloseDialog}
        action={createDiscount}
        status={createDiscountStatus}
      />
    </AdminPageLayout>
  );
};

export default DiscountListPage;
