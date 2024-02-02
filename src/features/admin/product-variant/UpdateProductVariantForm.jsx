import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullProductVariantForm from "./FullProductVariantForm";
import { Loading, FetchDataErrorMessage } from "../components";
import ACTION_STATUS from "../../../constants/actionStatus";
import {
  getProductOrigins,
  selectAllProductOrigins,
} from "../product-origin/productOriginSlice";
import {
  updateProductVariant,
  getProductVariants,
  selectProductVariantById,
} from "./productVariantSlice";

const productVariants = [
  {
    id: "1",
    productId: "1",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/7/638137864183879681_msi-gaming-gf63-thin-11uc-den-1.jpg",
      "https://lh3.googleusercontent.com/1S6Ltn5pJWSMWh0U6V4w80Di1Lq8AVQhuDOzVHbQPmxwcztwofrF_3gyuy7Pk8AJ73MVFCYDgm4r1orx6eh88iwVj9nDyXk=w500-rw",
    ],
    warehouse: 10,
    showOnHomePage: true,
    discount: 100,
  },
  {
    id: "2",
    productId: "2",
    name: "Laptop MSI Gaming Thin GF63 12VE-454VN i5 12450H/16GB/512GB/15.6 FHD/GeForce RTX 4050 6GB/Win 11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 10,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/7/638137864183879681_msi-gaming-gf63-thin-11uc-den-1.jpg",
    ],
    warehouse: 10,
    showOnHomePage: true,
    discount: 100,
  },
  {
    id: "3",
    productId: "3",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: false,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 0,
    showOnHomePage: false,
    discount: 100,
  },
  {
    id: "4",
    productId: "4",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    showOnHomePage: true,
    discount: 100,
  },
  {
    id: "5",
    productId: "5",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    showOnHomePage: true,
    discount: 100,
  },
  {
    id: "6",
    productId: "6",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: false,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 0,
    showOnHomePage: false,
    discount: 100,
  },
  {
    id: "7",
    productId: "7",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: false,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 0,
    showOnHomePage: false,
    discount: 100,
  },
  {
    id: "8",
    productId: "8",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    showOnHomePage: true,
    discount: 100,
  },
  {
    id: "9",
    productId: "9",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    showOnHomePage: true,
    discount: 100,
  },
  {
    id: "10",
    productId: "10",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    showOnHomePage: true,
    discount: 100,
  },
  {
    id: "11",
    productId: "11",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    showOnHomePage: true,
    discount: 100,
  },
  {
    id: "12",
    productId: "12",
    name: "Laptop Asus TUF Gaming FX506HF-HN017W i5 11400H/16GB/512GB/GeForce RTX 2050 4GB/Win11",
    price: 1000,
    specifications:
      "15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-Glare, Intel, Core i5, 11400H, 16 GB (2 thanh 8 GB), DDR4, 3200 MHz,SSD 512 GB",
    color: 9,
    status: true,
    media: [
      "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/4/638162268369378408_asus-tuf-gaming-fx506hf-den-1.jpg",
    ],
    warehouse: 10,
    showOnHomePage: true,
    discount: 100,
  },
];

const UpdateProductVariantForm = ({ productVariantId }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProductOrigins);

  const productVariant = productVariants.find(
    (productVariant) => productVariant.id === productVariantId
  );

  // const productVariant = useSelector((state) => selectProductVariantById(state, productVariantId));
  const { updateProductVariantStatus, getProductVariantsStatus } = useSelector(
    (state) => state.adminProductVariants
  );
  const { getProductOriginsStatus } = useSelector(
    (state) => state.adminProductOrigins
  );

  // useEffect(() => {
  //   if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getProductOrigins());
  //   }

  //   if (getProductVariantsStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getProductVariants());
  //   }
  // }, []);

  // if (
  //   getProductOriginsStatus === ACTION_STATUS.IDLE ||
  //   getProductOriginsStatus === ACTION_STATUS.LOADING ||
  //   getProductVariantsStatus === ACTION_STATUS.IDLE ||
  //   getProductVariantsStatus === ACTION_STATUS.LOADING
  // ) {
  //   return <Loading />;
  // }

  // if (
  //   getProductOriginsStatus === ACTION_STATUS.FAILED ||
  //   getProductVariantsStatus === ACTION_STATUS.FAILED
  // ) {
  //   return <FetchDataErrorMessage />;
  // }

  return (
    <FullProductVariantForm
      productOrigins={products}
      isEdit={false}
      action={updateProductVariant}
      status={updateProductVariantStatus}
      productVariant={productVariant}
    />
  );
};

export default UpdateProductVariantForm;
