import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import adminBrandReducer from '../features/admin/brand/brandSlice';
import adminCategoryReducer from '../features/admin/category/categorySlice';
import adminInventoryReducer from '../features/admin/inventory/inventorySlice';
import userReducer from '../features/admin/users/userSlice';
import accountReducer from '../features/settings/accountSlice';
import adminProductOriginReducer from '../features/admin/product-origin/productOriginSlice';
import adminProductVariantReducer from '../features/admin/product-variant/productVariantSlice';
import productReducer from '../features/admin/product/productSlice';
import discountReducer from '../features/admin/discount/discountSlice';
import notificationReducer from '../features/common/notificationSlice';
import ordersReducer from '../features/admin/order/orderSlice';
import bannerReducer from '../features/admin/banner/bannerSlice';
import statsReducer from '../features/admin/dashboard/statsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    adminBrands: adminBrandReducer,
    adminCategories: adminCategoryReducer,
    adminInventories: adminInventoryReducer,
    adminProductOrigins: adminProductOriginReducer,
    adminProductVariants: adminProductVariantReducer,
    users: userReducer,
    products: productReducer,
    discounts: discountReducer,
    notifications: notificationReducer,
    orders: ordersReducer,
    banners: bannerReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});
