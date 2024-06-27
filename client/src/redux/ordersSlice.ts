import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllOrders,
  fetchCheckStatus,
  fetchOneOrder,
} from "./thunkActions_orders";
import { OrdersSliceType } from "../types";
import {
  fetchDelete,
  fetchEditComment,
  fetchPostComment,
} from "./thunkActions_comment_admin";

const initialState: OrdersSliceType = {
  orders: [],
  order: {},
  adminSearchInput: { search: "" },
  filteredOrders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    changeStatus(state, { payload }) {
      const currentIndex = state.orders.findIndex((el) => el.id === payload);
      const currentStatus = state.orders[currentIndex].status_collect;
      state.orders[currentIndex].status_collect = !currentStatus;
    },
    changeStatusCollect(state, { payload }) {
      const currentIndex = state.orders.findIndex((el) => el.id === payload);
      const currentStatus = state.orders[currentIndex].status;
      state.orders[currentIndex].status = !currentStatus;
    },
    setAdminSearchInput(state, { payload }) {
      state.adminSearchInput = payload;
    },
    setfilteredOrders(state, { payload }) {
      state.filteredOrders = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      console.log("ERROR: fetchAllOrders no answer");
    });
    builder.addCase(fetchOneOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(fetchPostComment.fulfilled, (state, action) => {
      state.order.comment_admin = action.payload?.res.comment_admin;
    });
    builder.addCase(fetchDelete.fulfilled, (state, action) => {
      state.order.comment_admin = "";
    });
    builder.addCase(fetchEditComment.fulfilled, (state, action) => {
      state.order.comment_admin = action.payload?.res.comment_admin;
    });
  },
});

export default ordersSlice.reducer;
export const {
  changeStatus,
  changeStatusCollect,
  setAdminSearchInput,
  setfilteredOrders,
} = ordersSlice.actions;
