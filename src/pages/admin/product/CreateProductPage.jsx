import React from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { CreateProductForm } from '../../../features/admin/product';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product', path: '/admin/product' },
  { label: 'Create' }
];

const CreateProductPage = () => {

  return (
    <AdminPageLayout
      pageTitle='Create a new product'
      pageHeaderName='Create product'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <CreateProductForm />
    </AdminPageLayout>
  );
};

export default CreateProductPage;
