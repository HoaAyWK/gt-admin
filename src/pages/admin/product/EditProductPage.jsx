import React from 'react';
import { useParams } from 'react-router-dom';
import AdminPageLayout from '../common/AdminPageLayout';

import { EditProductTabs } from '../../../features/admin/product';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product', path: '/admin/products' },
  { label: 'Edit' }
];

const EditProductPage = () => {

  return (
    <AdminPageLayout
      pageTitle='Edit product'
      pageHeaderName='Edit product'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <EditProductTabs />
    </AdminPageLayout>
  );
};

export default EditProductPage;
