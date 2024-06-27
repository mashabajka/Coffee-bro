import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchGetLogin, fetchLogOut } from "./thunkActions_login";

const logSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLogin.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload.email;          
        })
        .addCase(fetchLogin.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchGetLogin.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
          })
        .addCase(fetchLogOut.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
           
            
          })
    },
  });
  
  export default logSlice.reducer;