import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductVariantForm from "./ProductVariantForm";
import { Loading, FetchDataErrorMessage } from "../components";
import ACTION_STATUS from "../../../constants/actionStatus";
import {
  getProductOrigins,
  selectAllProductOrigins,
} from "../product-origin/productOriginSlice";
import { createProductVariant } from "./productVariantSlice";

const products = [
  {
    id: "1",
    productId: "1",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    status: true,
    colors: [1, 2, 3],
    price: 1000,
  },
  {
    id: "2",
    productId: "2",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    status: true,
    colors: [4, 5, 6],
    price: 1000,
  },
  {
    id: "3",
    productId: "3",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    status: true,
    colors: [7, 8, 9],
    price: 1000,
  },
  {
    id: "4",
    productId: "4",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    status: true,
    colors: [1, 3, 5],
    price: 1000,
  },
  {
    id: "5",
    productId: "5",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    status: true,
    colors: [2, 4, 6],
    price: 1000,
  },
  {
    id: "6",
    productId: "6",
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    status: true,
    colors: [7, 8, 9],
    price: 1000,
  },
];

const CreateProductVariantForm = () => {
  const dispatch = useDispatch();

  // const products = useSelector(selectAllProductOrigins);
  const { createProductVariantStatus } = useSelector(
    (state) => state.adminProductVariants
  );
  const { getProductOriginsStatus } = useSelector(
    (state) => state.adminProductOrigins
  );

  // useEffect(() => {
  //   if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getProductOrigins());
  //   }
  // }, []);

  // if (
  //   getProductOriginsStatus === ACTION_STATUS.IDLE ||
  //   getProductOriginsStatus === ACTION_STATUS.LOADING
  // ) {
  //   return <Loading />;
  // }

  // if (getProductOriginsStatus === ACTION_STATUS.FAILED) {
  //   return <FetchDataErrorMessage />;
  // }

  return (
    <ProductVariantForm
      productOrigins={products}
      isEdit={false}
      action={createProductVariant}
      status={createProductVariantStatus}
    />
  );
};

export default CreateProductVariantForm;
