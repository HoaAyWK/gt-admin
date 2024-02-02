import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getComparator, applySortFilter } from "../../../utils/tableUtil";
import { DataTable, FetchDataErrorMessage, Loading } from "../components";

import {
  selectAllProductVariants,
  getProductVariants,
} from "./productVariantSlice";
import ACTION_STATUS from "../../../constants/actionStatus";
import ProductVariantLine from "./ProductVariantLine";

const TABLE_HEAD = [
  { id: "name", label: "Product Origin", alignRight: false },
  { id: "specification", label: "Specification", alignRight: false },
  { id: "color", label: "Color", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "price", label: "Price", alignRight: true },
  { id: "", label: "", alignRight: false },
];

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
  },
];

const ProductList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { getProductVariantsStatus } = useSelector(
    (state) => state.adminProductVariants
  );
  // const productVariants = useSelector(selectAllProductVariants);

  // useEffect(() => {
  //   if (getProductVariantsStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getProductVariants());
  //   }
  // }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProducts = applySortFilter(
    productVariants,
    getComparator(order, orderBy),
    filterName
  );

  // if (
  //   getProductVariantsStatus === ACTION_STATUS.IDLE ||
  //   getProductVariantsStatus === ACTION_STATUS.LOADING
  // ) {
  //   return <Loading />;
  // }

  // if (getProductVariantsStatus === ACTION_STATUS.FAILED) {
  //   return <FetchDataErrorMessage />;
  // }

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredProducts}
      tableHead={TABLE_HEAD}
      title="product variants"
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredProducts
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <ProductVariantLine variant={row} key={row.id} />
        ))}
    </DataTable>
  );
};

export default ProductList;
