import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostComment = createAsyncThunk(
  "comment/new",
  async (data: { id: number; input: string }) => {
    console.log(data);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/admin/comment/${data.id}`,
        { comment: data.input }
      );

      if (response.status === 200) {
        return { id: data.id, res: response.data };
      }
    } catch (error) {
      console.log("COMMENT POST ERR", error);
    }
  }
);

export const fetchDelete = createAsyncThunk(
  "comment/del",
  async (id: number) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/comment/${id}`
      );

      if (response.status === 200) {
        return id;
      }
    } catch (error) {
      console.log("COMMENT DELETE ERR", error);
    }
  }
);

export const fetchEditComment = createAsyncThunk(
  "comment/edit",
  async (data: { id: number; input: string }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/admin/comment/${data.id}`,
        { comment: data.input }
      );

      if (response.status === 200) {
        return { id: data.id, res: response.data };
      }
    } catch (error) {
      console.log("COMMENT EDIT ERR", error);
    }
  }
);
