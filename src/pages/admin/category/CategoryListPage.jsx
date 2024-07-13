import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { CategoryList, CategoryForm } from '../../../features/admin/category';
import { createCategory } from '../../../features/admin/category/categorySlice';
import PATHS from '../../../constants/paths';

const breadcrumbs = [
  { label: 'Dashboard', path: PATHS.DASHBOARD },
  { label: 'Category', path: PATHS.CATEGORIES },
  { label: 'List' },
];

const CategoryListPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { createCategoryStatus } = useSelector((state) => state.adminCategories);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <AdminPageLayout
      pageTitle='Categories'
      pageHeaderName='Categories'
      showCreateButton={true}
      createWithDialog={true}
      createName='Category'
      onOpenDialog={handleOpenDialog}
      breadcrumbs={breadcrumbs}
    >
      <CategoryList />
      <CategoryForm
        dialogTitle='Create Category'
        dialogContent='Create a new category'
        isEdit={false}
        open={openDialog}
        handleClose={handleCloseDialog}
        action={createCategory}
        actionStatus={createCategoryStatus}
      />
    </AdminPageLayout>
  );
};

export default CategoryListPage;
