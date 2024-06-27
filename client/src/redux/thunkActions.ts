/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { ItemsType } from './orderSlice';


export const fetchItems = createAsyncThunk('items/all', async () => {
  const response = await axios.get<ItemsType>(
    `http://localhost:3000/trade`,
  );
  console.log('--------')
  return response.data;
});

// export const fetchAdd = createAsyncThunk('posts/add', async (inputs: InputsType) => {
//   const response = await axios.post<InputsType, AxiosResponse<PostType>>(
//     `${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/posts`,
//     inputs,
//   );
//   return response.data;
// });

// export const fetchDelete = createAsyncThunk('posts/del', async (id: number) => {
//   const response = await axios.delete(
//     `${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/posts/${id}`,
//   );
//   if (response.status === 200) {
//     return id;
//   }
// });
