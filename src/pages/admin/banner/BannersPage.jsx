import React, { useState } from 'react';

import { AdminPageLayout } from '../common';
import { BannerList } from '../../../features/admin/banner';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Banner', path: '/admin/banners' },
  { label: 'Management' },
];

const BannersPage = () => {
  return (
    <AdminPageLayout
      pageTitle='Banners management'
      pageHeaderName='Banners management'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <BannerList />
    </AdminPageLayout>
  );
};

export default BannersPage;
