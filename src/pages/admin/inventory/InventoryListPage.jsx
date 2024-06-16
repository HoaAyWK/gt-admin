import React from "react";
import { Grid } from "@mui/material";

import { AdminPageLayout } from "../common";
import Inventory from "../../../features/admin/inventory";

const breadcrumbs = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Warehouse", path: "/warehouse" },
  { label: "List" },
];

const InventoryListPage = () => {
  return (
    <AdminPageLayout
      pageTitle="Warehouse List"
      pageHeaderName="Warehouse"
      showCreateButton={false}
      breadcrumbs={breadcrumbs}
    >
      <Inventory />
    </AdminPageLayout>
  );
};

export default InventoryListPage;
