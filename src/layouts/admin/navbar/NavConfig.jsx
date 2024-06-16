import { Iconify } from "../../../components";
import PATHS from "../../../constants/paths";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "GENERAL",
  },
  {
    title: "dashboard",
    path: "/dashboard",
    icon: getIcon("ri:dashboard-3-line"),
  },
  {
    title: "MANAGEMENT",
  },
  {
    title: "user",
    path: "/users",
    icon: getIcon("eva:people-fill"),
    children: [
      {
        title: "list",
        path: PATHS.USERS_LIST,
      },
      {
        title: "create",
        path: PATHS.USERS_CREATE,
      },
    ],
  },
  {
    title: "products",
    path: PATHS.PRODUCTS,
    icon: getIcon("icon-park-outline:ad-product"),
    children: [
      {
        title: "list",
        path: PATHS.PRODUCTS_LIST,
      },
      {
        title: "create",
        path: PATHS.PRODUCTS_CREATE,
      },
    ],
  },
  {
    title: "categories",
    path: PATHS.CATEGORIES,
    icon: getIcon("bxs:category"),
  },
  {
    title: "brands",
    path: PATHS.BRANDS,
    icon: getIcon("mdi:alpha-a-circle"),
  },
  {
    title: "orders",
    path: PATHS.ORDERS,
    icon: getIcon("solar:delivery-bold"),
  },
  {
    title: "invoices",
    path: PATHS.INVOICES,
    icon: getIcon("bx:bxs-receipt"),
  },
  {
    title: "discounts",
    path: PATHS.DISCOUNTS,
    icon: getIcon("ic:baseline-discount"),
  },
  {
    title: "banners",
    path: PATHS.BANNERS,
    icon: getIcon("ri:advertisement-fill"),
  },
];

export default navConfig;
