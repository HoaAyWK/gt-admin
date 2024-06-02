import React, { useState } from "react";
import { Box, Stack, TableRow, TableCell, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { Iconify, Label } from "../../../../components";
import { MoreMenu, MoreMenuItem } from "../../../../components/table";
import { fDateTime } from "../../../../utils/formatTime";
import BannerForm from "../BannerForm";

const BannerLine = ({ banner, handleSetIsEdit }) => {
  const { id, product, createdDateTime, isActive, displayOrder, direction } =
    banner;
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { updateBannersStatus } = useSelector((state) => state.banners);

  const handleOpenEdit = (id) => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell component="th" scope="row" align="left">
          <Typography variant="body1">{product?.name}</Typography>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {product?.productVariant?.attributes && (
            <Stack spacing={0.2}>
              {Object.keys(product.productVariant.attributes).map((key) => (
                <Typography key={key} variant="body2">
                  {key}: {product.productVariant.attributes[key]}
                </Typography>
              ))}
            </Stack>
          )}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <Iconify
              icon={isActive ? "material-symbols:check" : "ic:baseline-minus"}
              width={24}
              height={24}
              style={{ color: isActive ? "#00B074" : "#454F5B" }}
            />
          </Box>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Typography variant="body1">{displayOrder}</Typography>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Label color={direction === "Horizontal" ? "primary" : "secondary"}>
            {direction}
          </Label>
        </TableCell>
        <TableCell align="left">{fDateTime(createdDateTime)}</TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem
              title="Edit"
              iconName="eva:edit-outline"
              handleClick={(id) => handleOpenEdit(id)}
            />
            <MoreMenuItem
              title="Delete"
              iconName="eva:trash-2-outline"
              handleClick={handleOpenConfirm}
              id={id}
            />
          </MoreMenu>
        </TableCell>
      </TableRow>

      <BannerForm
        dialogTitle="Edit Banner"
        dialogContent="Edit banner"
        open={openEdit}
        handleClose={handleCloseEdit}
        isEdit={openEdit}
        banner={banner}
      />
    </>
  );
};

export default BannerLine;
