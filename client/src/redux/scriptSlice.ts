import { createSlice } from '@reduxjs/toolkit';
import { loadScript } from './thunkLoadScript';
import { AnyAction } from '@reduxjs/toolkit';
import { fetchOrdersAdd } from './thunkOrders';

const scriptSlice = createSlice({
  name: 'scriptSlice',
  initialState: {
    loaded: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadScript.fulfilled, (state) => {
        state.loaded = true;
        state.error = null;
      })
      .addCase(loadScript.rejected, (state, action: AnyAction) => {
        state.loaded = false;
        state.error = action.payload || null;
      });
  },
});

const infoOrderSlice = createSlice({
  name: 'infoOrderSlice',
  initialState: {
    isSent: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAdd.fulfilled, (state) => {
        state.isSent = true;
      })
      .addCase(fetchOrdersAdd.rejected, (state) => {
        state.isSent = false;
      });
  },
});

export default scriptSlice.reducer;
export const infoOrderReducer = infoOrderSlice.reducer;
