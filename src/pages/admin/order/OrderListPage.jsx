import React from 'react';

import { AdminPageLayout } from '../common';
import { Orders } from '../../../features/admin/order';
import PATHS from '../../../constants/paths';

const breadcrumbs = [
  { label: 'Dashboard', path: PATHS.DASHBOARD },
  { label: 'Order', path: PATHS.ORDERS },
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
