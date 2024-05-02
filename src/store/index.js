import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import adminBrandReducer from '../features/admin/brand/brandSlice';
import adminCategoryReducer from '../features/admin/category/categorySlice';
import adminInventoryReducer from '../features/admin/inventory/inventorySlice';
import adminUserReducer from '../features/admin/users/userSlice';
import adminOrderReducer from '../features/admin/order/orderSlice';
import accountReducer from '../features/settings/accountSlice';
import adminProductOriginReducer from '../features/admin/product-origin/productOriginSlice';
import adminBannerReducer from '../features/admin/banner/bannerSlice';
import adminProductVariantReducer from '../features/admin/product-variant/productVariantSlice';
import productReducer from '../features/admin/product/productSlice';
import discountReducer from '../features/admin/discount/discountSlice';
import notificationReducer from '../features/common/notificationSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    adminBrands: adminBrandReducer,
    adminCategories: adminCategoryReducer,
    adminInventories: adminInventoryReducer,
    adminUsers: adminUserReducer,
    adminOrders: adminOrderReducer,
    adminProductOrigins: adminProductOriginReducer,
    adminProductVariants: adminProductVariantReducer,
    adminBanners: adminBannerReducer,
    products: productReducer,
    discounts: discountReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});
