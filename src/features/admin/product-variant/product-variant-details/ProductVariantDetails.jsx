import React, { useEffect, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Iconify, Cover, Label } from "../../../../components";
import {
  FetchDataErrorMessage,
  LabelAndContent,
  Loading,
} from "../../components";
import { ProductVariantImage } from "./components";
import {
  getProductVariants,
  selectProductVariantById,
} from "../productVariantSlice";
import ACTION_STATUS from "../../../../constants/actionStatus";
import emptyImage from "../../../../assets/images/image_illustration.png";
import { COLOR_LIST } from "../../../../constants/colors";
import { fCurrency } from "../../../../utils/formatNumber";

const productVariants = [
  {
    id: "1",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    discount: 100,
  },
  {
    id: "2",
    name: "Laptop MSI Gaming Thin GF63 12VE-454VN i5 12450H/16GB/512GB/15.6 FHD/GeForce RTX 4050 6GB/Win 11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 10,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/7/638137864183879681_msi-gaming-gf63-thin-11uc-den-1.jpg",
    ],
    warehouse: 10,
    discount: 100,
  },
  {
    id: "3",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: false,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 0,
    discount: 100,
  },
  {
    id: "4",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    discount: 100,
  },
  {
    id: "5",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    discount: 100,
  },
  {
    id: "6",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: false,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 0,
    discount: 100,
  },
  {
    id: "7",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: false,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 0,
    discount: 100,
  },
  {
    id: "8",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    discount: 100,
  },
  {
    id: "9",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    discount: 100,
  },
  {
    id: "10",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    discount: 100,
  },
  {
    id: "11",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    discount: 100,
  },
  {
    id: "12",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: "1000",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    discount: 100,
  },
];

const ProductVariantDetails = ({ productVariantId }) => {
  const dispatch = useDispatch();
  // const productVariant = useSelector((state) => selectProductVariantById(state, productVariantId));
  const { getProductVariantsStatus } = useSelector(
    (state) => state.adminProductVariants
  );

  const productVariant = productVariants.find(
    (variant) => variant.id === productVariantId
  );

  const imagesExceptFirst = useMemo(() => {
    return productVariant?.media?.slice(1);
  }, [productVariant]);

  // useEffect(() => {
  //   if (getProductVariantsStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getProductVariants());
  //   }
  // }, []);

  // if (getProductVariantsStatus === ACTION_STATUS.IDLE ||
  //     getProductVariantsStatus === ACTION_STATUS.LOADING) {
  //   return <Loading />;
  // }

  // if (getProductVariantsStatus === ACTION_STATUS.FAILED) {
  //   return <FetchDataErrorMessage />;
  // }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          color="text.primary"
          sx={{ xs: { mb: 2 }, md: { mb: 0 } }}
        >
          {productVariant?.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            LinkComponent={RouterLink}
            to={`/admin/product-variants/edit/${productVariantId}`}
            color="primary"
          >
            <Iconify icon="eva:edit-outline" width={20} height={20} />
            &nbsp; Edit
          </Button>
          <Button color="error">
            <Iconify icon="eva:trash-2-outline" width={20} height={20} />
            &nbsp; Delete
          </Button>
        </Stack>
      </Box>
      <Grid container spacing={4}>
        <Grid item container spacing={2} xs={12} md={6}>
          <Grid item xs={12}>
            {productVariant?.media?.length > 0 ? (
              <Cover
                component="img"
                src={productVariant.media[0]}
                alt="image"
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  maxHeight: 450,
                  borderRadius: 1,
                }}
                loading="lazy"
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  py: 2,
                }}
              >
                <Cover
                  component="img"
                  alt="image"
                  loading="lazy"
                  src={emptyImage}
                  sx={{
                    width: 200,
                    height: 160,
                    objectFit: "cover",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                >
                  This product does not have any image
                </Typography>
              </Box>
            )}
          </Grid>
          {imagesExceptFirst?.length > 0 &&
            imagesExceptFirst?.map((image) => (
              <Grid key={image} item xs={12} sm={6} md={4}>
                <ProductVariantImage image={image} />
              </Grid>
            ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <LabelAndContent
                label="specification"
                content={productVariant?.specifications}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelAndContent
                label="color"
                content={COLOR_LIST[productVariant?.color]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelAndContent
                label="quantity"
                content={
                  productVariant.warehouse ? productVariant.warehouse : 0
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelAndContent
                label="price"
                content={`${fCurrency(productVariant.price)}`}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelAndContent
                label="discount"
                content={`${
                  productVariant?.discount ? productVariant.discount : 0
                }%`}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textTransform="uppercase"
                >
                  Status
                </Typography>
                <Box>
                  <Label color={productVariant?.status ? "success" : "error"}>
                    {productVariant?.status ? "Available" : "Unavailable"}
                  </Label>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductVariantDetails;
