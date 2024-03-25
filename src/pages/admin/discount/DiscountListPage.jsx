import React, { useState } from 'react';

import { AdminPageLayout } from '../common';
import { DiscountList, DiscountForm } from '../../../features/admin/discount';
import { createDiscount } from '../../../features/admin/discount/discountSlice';
import { useSelector } from 'react-redux';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Discounts', path: '/admin/discounts' },
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
