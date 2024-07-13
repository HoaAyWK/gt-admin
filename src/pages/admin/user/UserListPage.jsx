import React from 'react';

import { AdminPageLayout } from '../common';
import { UserList } from '../../../features/admin/users';
import PATHS from '../../../constants/paths';

const breadcrumbs = [
  { label: 'Dashboard', path: PATHS.DASHBOARD },
  { label: 'User', path: PATHS.USERS },
  { label: 'List' },
];

const UserListPage = () => {
  return (
    <AdminPageLayout
      pageTitle='User List'
      pageHeaderName='Users'
      breadcrumbs={breadcrumbs}
      showCreateButton={true}
      createName='User'
      createPath={PATHS.USERS_CREATE}
    >
      <UserList />
    </AdminPageLayout>
  );
};

export default UserListPage;
