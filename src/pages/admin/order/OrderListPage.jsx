import React from 'react';

import { AdminPageLayout } from '../common';
import { Orders } from '../../../features/admin/order';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Order', path: '/admin/orders' },
  { label: 'List' },
];

const OrderListPage = () => {
  return (
    <AdminPageLayout
      pageHeaderName='Orders'
      pageTitle='Orders'
      showCreateButton={false}
      breadcrumbs={breadcrumbs}
    >
      <Orders />
    </AdminPageLayout>
  );
};

export default OrderListPage;
