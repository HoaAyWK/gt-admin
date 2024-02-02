import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getProductOrigins,
  selectProductOriginById,
} from "../productOriginSlice";
import {
  FetchDataErrorMessage,
  LabelAndContent,
  Loading,
} from "../../components";
import { ProductVariantCard } from "./components";
import { Iconify } from "../../../../components";
import ACTION_STATUS from "../../../../constants/actionStatus";
import { getBrands, selectBrandById } from "../../brand/brandSlice";
import { createMarkup } from "../../../../utils/sanitizeHtml";
import { getCategories } from "../../category/categorySlice";
import {
  getProductVariants,
  selectProductVariantByProductOriginId,
} from "../../product-variant/productVariantSlice";

const products = [
  {
    id: "1",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    media: [
      ' "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",',
    ],
    color: 9,
    specifications: "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare",
    price: 10000,
    discount: 10,
    status: true,
    categories: [
      {
        id: "1",
        name: "Laptop",
      },
      {
        id: "2",
        name: "Asus",
      },
    ],
  },
  {
    id: "2",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    media: [
      ' "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",',
    ],
    color: 9,
    specifications: "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare",
    price: 10000,
    discount: 10,
    status: true,
    categories: [
      {
        id: "1",
        name: "Laptop",
      },
      {
        id: "2",
        name: "Asus",
      },
    ],
  },
  {
    id: "3",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    media: [
      ' "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",',
    ],
    color: 9,
    specifications: "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare",
    price: 10000,
    discount: 10,
    status: true,
    categories: [
      {
        id: "1",
        name: "Laptop",
      },
      {
        id: "2",
        name: "Asus",
      },
    ],
  },
  {
    id: "4",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    media: [
      ' "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",',
    ],
    color: 9,
    specifications: "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare",
    price: 10000,
    discount: 10,
    status: true,
  },
  {
    id: "5",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    description:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    information:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    media: [
      ' "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",',
    ],
    color: 9,
    specifications: "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare",
    price: 10000,
    discount: 10,
    status: true,
    categories: [
      {
        id: "1",
        name: "Laptop",
      },
      {
        id: "2",
        name: "Asus",
      },
    ],
  },
];

const ProductOriginDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((product) => product.id === id);

  // const product = useSelector((state) => selectProductOriginById(state, id));
  const { getProductOriginsStatus } = useSelector(
    (state) => state.adminProductOrigins
  );
  const { getProductVariantsStatus } = useSelector(
    (state) => state.adminProductVariants
  );
  const brand = useSelector((state) =>
    selectBrandById(state, product?.distributorId)
  );
  const { getBrandsStatus } = useSelector((state) => state.adminBrands);
  const { entities: categoryEntities, getCategoriesStatus } = useSelector(
    (state) => state.adminCategories
  );
  const productVariants = useSelector((state) =>
    selectProductVariantByProductOriginId(state, id)
  );

  // useEffect(() => {
  //   if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getProductOrigins());
  //   }

  //   if (getProductVariantsStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getProductVariants());
  //   }

  //   if (getBrandsStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getBrands());
  //   }

  //   if (getCategoriesStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getCategories());
  //   }
  // }, []);

  // if (
  //   getProductOriginsStatus === ACTION_STATUS.IDLE ||
  //   getProductOriginsStatus === ACTION_STATUS.LOADING ||
  //   getBrandsStatus === ACTION_STATUS.IDLE ||
  //   getBrandsStatus === ACTION_STATUS.LOADING ||
  //   getCategoriesStatus === ACTION_STATUS.IDLE ||
  //   getCategoriesStatus === ACTION_STATUS.LOADING
  // ) {
  //   return <Loading />;
  // }

  // if (
  //   getProductOriginsStatus === ACTION_STATUS.FAILED ||
  //   getBrandsStatus === ACTION_STATUS.FAILED ||
  //   getCategoriesStatus === ACTION_STATUS.FAILED
  // ) {
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
          {product.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            LinkComponent={RouterLink}
            to={`/admin/product-origins/edit/${id}`}
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
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Stack spacing={0.5}>
            <Typography
              variant="body2"
              color="text.secondary"
              textTransform="uppercase"
            >
              categories
            </Typography>
            <Typography variant="body1" color="text.primary">
              {product.categories.map(
                (categoryId) => categoryEntities[categoryId]?.name
              )}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <LabelAndContent label="BRAND" content={brand?.name} />
        </Grid>
      </Grid>
      <Stack spacing={4}>
        <Stack spacing={0.5}>
          <Typography
            variant="body2"
            color="text.secondary"
            textTransform="uppercase"
          >
            description
          </Typography>
          <Box
            sx={{
              p: 2,
              border: (theme) => `2px dashed ${theme.palette.divider}`,
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body1"
              color="text.primary"
              dangerouslySetInnerHTML={createMarkup(product.description)}
              sx={
                {
                  // textOverflow: 'ellipsis',
                  // overflow: 'hidden',
                  // whiteSpace: 'nowrap',
                  // '& p': {
                  //   textOverflow: 'ellipsis',
                  //   overflow: 'hidden',
                  //   whiteSpace: 'nowrap'
                  // },
                  // '& span': {
                  //   textOverflow: 'ellipsis',
                  //   overflow: 'hidden',
                  //   whiteSpace: 'nowrap',
                  //   color: 'inherit !important',
                  //   backgroundColor: 'inherit !important',
                  //   width: 'auto'
                  // },
                }
              }
            />
          </Box>
        </Stack>
        <Stack spacing={0.5}>
          <Typography
            variant="body2"
            color="text.secondary"
            textTransform="uppercase"
          >
            information
          </Typography>
          <Box
            sx={{
              p: 2,
              border: (theme) => `2px dashed ${theme.palette.divider}`,
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body1"
              color="text.primary"
              dangerouslySetInnerHTML={createMarkup(product.information)}
              sx={
                {
                  // textOverflow: 'ellipsis',
                  // overflow: 'hidden',
                  // whiteSpace: 'nowrap',
                  // '& p': {
                  //   textOverflow: 'ellipsis',
                  //   overflow: 'hidden',
                  //   whiteSpace: 'nowrap'
                  // },
                  // '& span': {
                  //   textOverflow: 'ellipsis',
                  //   overflow: 'hidden',
                  //   whiteSpace: 'nowrap',
                  //   color: 'inherit !important',
                  //   backgroundColor: 'inherit !important',
                  //   width: 'auto'
                  // },
                }
              }
            />
          </Box>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          mb: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          PRODUCT VARIANTS
        </Typography>
        <Button
          variant="contained"
          color="primary"
          LinkComponent={RouterLink}
          to="/admin/product-variants/create"
        >
          <Iconify icon="eva:plus-fill" width={24} height={24} />
          &nbsp; Add Variant
        </Button>
      </Box>
      <Grid container spacing={2}>
        {productVariants.map((variant) => (
          <Grid item xs={12} sm={6} md={4} key={variant.id}>
            <ProductVariantCard variant={variant} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductOriginDetails;
