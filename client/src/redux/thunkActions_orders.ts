/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { OrdersArrType, TOrder } from "../types";

export const fetchAllOrders = createAsyncThunk("orders/all", async () => {
  try {
    const response = await axios.get<OrdersArrType>("http://localhost:3000/api/orders");    
    return response.data;
  } catch (error) {
    console.log("Get all orders err", error);
  }
});

export const fetchOneOrder = createAsyncThunk(
  "order/id",
  async (id: number) => {
    try {
      const response = await axios.get<TOrder>(
        `http://localhost:3000/api/orders/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("Get one order err", error);
    }
  }
);

export const fetchCheckStatus = createAsyncThunk('order/status', async (id: number) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/orders/${id}`

    );
    if (response.status === 200) {
      return {id, res: response.data};
  } else {
      return Promise.reject('Error edit');
  }
  } catch (error) {
    console.log("Get edit status order err", error);
    
  }
})

export const fetchCheckStatus_Collect = createAsyncThunk('order/status_collect', async (id: number) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/orders/${id}`

    );
    if (response.status === 200) {
      return {id, res: response.data};
  } else {
      return Promise.reject('Error edit');
  }
  } catch (error) {
    console.log("Get edit status order err", error);
    
  }
})
