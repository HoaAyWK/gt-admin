import React from "react";
import { useParams } from "react-router-dom";

import { AdminPageLayout } from "../common";
import { EditUser } from "../../../features/admin/users";
import PATHS from "../../../constants/paths";

const breadcrumbs = [
  { label: "Dashboard", path: PATHS.DASHBOARD },
  { label: "User", path: PATHS.USERS },
  { label: "Update user" },
];

const CreateUserPage = () => {
  const { id } = useParams();

  return (
    <AdminPageLayout
      pageTitle="Update user"
      pageHeaderName="Update user"
      showCreateButton={false}
      breadcrumbs={breadcrumbs}
    >
      <EditUser id={id} />
    </AdminPageLayout>
  );
};

export default CreateUserPage;
