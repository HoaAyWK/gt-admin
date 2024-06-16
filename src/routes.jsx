import React, { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useRoutes, Outlet } from "react-router-dom";

import ROLES from "./constants/userRoles";
import { useLocalStorage } from "./hooks";
import { LoadingPage } from "./components";
import ACTION_STATUS from "./constants/actionStatus";
import {
  getCurrentUserInfo,
  refreshStatusCode,
} from "./features/auth/authSlice";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/admin/setting/profile/ProfilePage";
import PasswordPage from "./pages/admin/setting/password/PasswordPage";

import { AdminLayout } from "./layouts";

import { DashboardPage } from "./pages/admin";
import { enqueueSnackbar } from "notistack";
import PATHS from "./constants/paths";

const BannersPage = lazy(() => import("./pages/admin/banner/BannersPage"));
const UserListPage = lazy(() => import("./pages/admin/user/UserListPage"));
const OrderListPage = lazy(() => import("./pages/admin/order/OrderListPage"));
const BrandListPage = lazy(() => import("./pages/admin/brand/BrandListPage"));
const CreateUserPage = lazy(() => import("./pages/admin/user/CreateUserPage"));
const UpdateUserPage = lazy(() => import("./pages/admin/user/UpdateUserPage"));
const UserDetailsPage = lazy(() =>
  import("./pages/admin/user/UserDetailsPage")
);
const CategoryListPage = lazy(() =>
  import("./pages/admin/category/CategoryListPage")
);
const InvoiceListPage = lazy(() =>
  import("./pages/admin/invoice/InvoiceListPage")
);
const AdminOrderDetailsPage = lazy(() =>
  import("./pages/admin/order/OrderDetailsPage")
);
const InventoryListPage = lazy(() =>
  import("./pages/admin/inventory/InventoryListPage")
);

const ProductListPage = lazy(() =>
  import("./pages/admin/product/ProductListPage")
);
const CreateProductPage = lazy(() =>
  import("./pages/admin/product/CreateProductPage")
);
const EditProductPage = lazy(() =>
  import("./pages/admin/product/EditProductPage")
);

const ProductOriginListPage = lazy(() =>
  import("./pages/admin/product-origin/ProductOriginListPage")
);
const CreateProductOriginPage = lazy(() =>
  import("./pages/admin/product-origin/CreateProductOriginPage")
);
const UpdateProductOriginPage = lazy(() =>
  import("./pages/admin/product-origin/UpdateProductOriginPage")
);
const ProductOriginDetailsPage = lazy(() =>
  import("./pages/admin/product-origin/ProductOriginDetailsPage")
);

const ProductVariantListPage = lazy(() =>
  import("./pages/admin/product-variant/ProductVariantListPage")
);
const CreateProductVariantPage = lazy(() =>
  import("./pages/admin/product-variant/CreateProductVariantPage")
);
const UpdateProductVariantPage = lazy(() =>
  import("./pages/admin/product-variant/UpdateProductVariantPage")
);
const ProductVariantDetailsPage = lazy(() =>
  import("./pages/admin/product-variant/ProductVariantDetailsPage")
);

const DiscountListPage = lazy(() =>
  import("./pages/admin/discount/DiscountListPage")
);

const RejectedRoute = () => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const { getCurrentUserStatus, user, statusCode, isAuthenticated } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (
      accessToken &&
      !isAuthenticated &&
      getCurrentUserStatus === ACTION_STATUS.IDLE
    ) {
      dispatch(getCurrentUserInfo());
    }
  }, [accessToken, isAuthenticated]);

  if (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED && statusCode === 401) {
    localStorage.setItem("accessToken", null);
    return <Outlet />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
    return <LoadingPage />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED) {
    if (
      isAuthenticated &&
      user?.role?.toLowerCase() === ROLES.ADMIN.toLocaleLowerCase()
    ) {
      return <Navigate to={PATHS.DASHBOARD} />;
    }
  }

  return <Outlet />;
};

const ProtectedAdminRoute = () => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const { getCurrentUserStatus, statusCode, isAuthenticated, user } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (
      accessToken &&
      getCurrentUserStatus === ACTION_STATUS.IDLE &&
      !isAuthenticated
    ) {
      dispatch(getCurrentUserInfo());
    }
  }, [accessToken, isAuthenticated]);

  if (statusCode === 401) {
    setAccessToken(null);
    localStorage.setItem("accessToken", null);
    return <Navigate to="/login" />;
  }

  if (!accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
    return <Navigate to="/login" />;
  }

  if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
    return <Outlet />;
  }

  if (accessToken && getCurrentUserStatus === ACTION_STATUS.LOADING) {
    return <LoadingPage />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.FAILED) {
    return <Navigate to="/login" />;
  }

  if (
    isAuthenticated &&
    user?.role?.toLowerCase() !== ROLES.ADMIN.toLowerCase()
  ) {
    enqueueSnackbar("You don't have permission to access this page!", {
      variant: "error",
    });
  }

  return isAuthenticated &&
    user?.role?.toLowerCase() === ROLES.ADMIN.toLowerCase() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <ProtectedAdminRoute />,
      children: [
        {
          path: "",
          element: <AdminLayout />,
          children: [
            { path: "", element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <DashboardPage /> },
            {
              path: "users",
              children: [
                {
                  path: "",
                  element: <Navigate to="list" />,
                },
                {
                  path: "list",
                  element: <UserListPage />,
                },
                {
                  path: "create",
                  element: <CreateUserPage />,
                },
                {
                  path: "edit/:id",
                  element: <UpdateUserPage />,
                },
                {
                  path: "details/:id",
                  element: <UserDetailsPage />,
                },
              ],
            },
            {
              path: "products",
              children: [
                {
                  path: "",
                  element: <Navigate to="list" />,
                },
                {
                  path: "list",
                  element: <ProductListPage />,
                },
                {
                  path: "create",
                  element: <CreateProductPage />,
                },
                {
                  path: "edit/:id",
                  element: <EditProductPage />,
                },
              ],
            },
            {
              path: "product-origins",
              children: [
                {
                  path: "",
                  element: <Navigate to="list" />,
                },
                {
                  path: "list",
                  element: <ProductOriginListPage />,
                },
                {
                  path: "create",
                  element: <CreateProductOriginPage />,
                },
                {
                  path: "details/:id",
                  element: <ProductOriginDetailsPage />,
                },
                {
                  path: "edit/:id",
                  element: <UpdateProductOriginPage />,
                },
              ],
            },
            {
              path: "product-variants",
              children: [
                {
                  path: "",
                  element: <Navigate to="list" />,
                },
                {
                  path: "list",
                  element: <ProductVariantListPage />,
                },
                {
                  path: "create",
                  element: <CreateProductVariantPage />,
                },
                {
                  path: "details/:id",
                  element: <ProductVariantDetailsPage />,
                },
                {
                  path: "edit/:id",
                  element: <UpdateProductVariantPage />,
                },
              ],
            },
            {
              path: "categories",
              element: <CategoryListPage />,
            },
            {
              path: "brands",
              element: <BrandListPage />,
            },
            {
              path: "discounts",
              element: <DiscountListPage />,
            },
            {
              path: "warehouse",
              element: <InventoryListPage />,
            },
            {
              path: "orders",
              children: [
                { path: "", element: <Navigate to="list" /> },
                { path: "list", element: <OrderListPage /> },
                { path: ":id", element: <AdminOrderDetailsPage /> },
              ],
            },
            {
              path: "invoices",
              element: <InvoiceListPage />,
            },
            {
              path: "banners",
              element: <BannersPage />,
            },
          ],
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "password",
          element: <PasswordPage />,
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
      ],
    },
  ]);
};

export default Router;
