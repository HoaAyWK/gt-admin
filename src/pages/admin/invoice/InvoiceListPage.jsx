import { InvoiceList } from "../../../features/admin/invoice";
import { AdminPageLayout } from "../common";
import { useState } from "react";

const breadcrumbs = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Invoice", path: "/invoices" },
  { label: "List" },
];

const InvoiceListPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <AdminPageLayout
      pageTitle="Brands"
      pageHeaderName="Brands"
      showCreateButton={false}
      createWithDialog={false}
      createName="Brand"
      onOpenDialog={handleOpenDialog}
      breadcrumbs={breadcrumbs}
    >
      <InvoiceList />
    </AdminPageLayout>
  );
};

export default InvoiceListPage;
