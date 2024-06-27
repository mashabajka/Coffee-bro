import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { ItemsType } from './orderSlice';
import nodemailer from 'nodemailer';


export const fetchItems = createAsyncThunk('items/all', async () => {
  const response = await axios.get<ItemsType>(
    `http://localhost:3000/trade`,
  );
  console.log('--------')
  return response.data;
});

export const fetchOrdersAdd = createAsyncThunk('orders/add', async (inputs) => {
  const response = await axios.post<ItemsType>(
    `http://localhost:3000/trade`, inputs);
  // return response.data;
});

export const fetchOrdersSendAdmin = createAsyncThunk('orders/sendAdmin', async ({ url, payload }) => {
  
    axios.defaults.withCredentials = false;
    const response = await axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // return response.data;
});

export const fetchOrdersSendClient = createAsyncThunk('orders/sendAdmin', async ({ url, payloadClient }) => {
  
    axios.defaults.withCredentials = false;
    const response = await axios.post(url, payloadClient, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // return response.data;
});

export const fetchOrdersEmail = createAsyncThunk('orders/email', async (formData) => {
  // try {
    const response = await axios.post(
      'http://localhost:3000/trade/send-email', formData);
    });  



