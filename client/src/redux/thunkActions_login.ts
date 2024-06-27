/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { IInputData } from "../types";

export const fetchLogOut = createAsyncThunk("logout/fetchLogOut", async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get("http://localhost:3000/api/admin/logout");

    return "";
  } catch (error) {
    throw error;
    // console.log('Ошибка logout', error);
  }
});

export const fetchLogin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<IInputData, AxiosResponse<any>>(
        "http://localhost:3000/api/admin/login",
        credentials,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetLogin = createAsyncThunk("login/getLogin", async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.get("http://localhost:3000/api/admin/login");
  return response.data;
});
