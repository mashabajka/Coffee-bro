//! #1 => go main.tsx

import { configureStore } from "@reduxjs/toolkit";
//! import ваших слайсов
import orderSlice from "./orderSlice";
import scriptSlice from "./scriptSlice";
import logSlice from "./logSlice";
import ordersSlice from "./ordersSlice";

const storeOptions = {
  reducer: {
    orderSlice, //! слайс под сущность
    scriptSlice,
    logSlice,
    ordersSlice,
    // someSlice, //! слайс под сущность
    // basketSlice, //! слайс под сущность
    // postSlice, //! слайс под сущность
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
