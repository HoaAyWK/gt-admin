import React, { useState } from "react";

import { AdminPageLayout } from "../common";
import { BannerList, BannerForm } from "../../../features/admin/banner";
import PATHS from "../../../constants/paths";

const breadcrumbs = [
  { label: "Dashboard", path: PATHS.DASHBOARD },
  { label: "Banner", path: PATHS.BANNERS },
  { label: "Management" },
];

const BannersPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleSetIsEdit = () => {
    setIsEdit(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <AdminPageLayout
      pageTitle="Banners management"
      pageHeaderName="Banners management"
      breadcrumbs={breadcrumbs}
      showCreateButton={true}
      createWithDialog={true}
      createName="Banner"
      onOpenDialog={handleOpenDialog}
    >
      <BannerForm
        dialogTitle="Create Banner"
        dialogContent="Create a new banner"
        open={openDialog}
        handleClose={handleCloseDialog}
      />
      <BannerList />
    </AdminPageLayout>
  );
};

export default BannersPage;
