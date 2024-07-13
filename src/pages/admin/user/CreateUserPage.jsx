import React from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { UserForm } from '../../../features/admin/users';
import { createUser } from '../../../features/admin/users/userSlice';
import PATHS from '../../../constants/paths';

const breadcrumbs = [
  { label: 'Dashboard', path: PATHS.DASHBOARD },
  { label: 'User', path: PATHS.USERS },
  { label: 'Create new user' },
];

const CreateUserPage = () => {
  const { createUserStatus } = useSelector((state) => state.users);

  return (
    <AdminPageLayout
      pageTitle='Create a new user'
      pageHeaderName='Create user'
      showCreateButton={false}
      breadcrumbs={breadcrumbs}
    >
      <UserForm isEdit={false} action={createUser} status={createUserStatus} />
    </AdminPageLayout>
  );
};

export default CreateUserPage;
