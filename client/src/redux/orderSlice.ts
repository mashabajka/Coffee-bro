//! #3 => go hooks.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchItems } from './thunkActions';


export type ItemType = {
  id: number;
  name: string;
  text: string; 
  url: string;
  price: number;
  priceDiscount: number;
  discount: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export type ItemsType = ItemType[];

export type OrderSliceType = {
  items: ItemsType;
  count: number[];

  // text: string;
  // answerR: string;
  // points: number;
};

const initialState: OrderSliceType = {
  items: [],
  count:[0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  // isGame: false,
  // text: '',
  // answerR: '',
  // points: 0
};

const rtkSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    increment(state, id) {
      state.count[id.payload] += 1;
    },
    decrement(state, id) {
      if(state.count[id.payload]>0) {
        state.count[id.payload] -= 1;
      }
      
    },
  },
  extraReducers: (builder) => {
    //! action.payload === return response.data
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    builder.addCase(fetchItems.rejected, () => {
      console.log('no answer 505');
      // window.location.assign('/error');
      console.error('Error:', action.error.message || 'Unknown error');

  // Вывод сообщения об ошибке с помощью alert
  // window.alert('An error occurred while fetching items: ' + (action.error.message || 'Unknown error'));
    });
    // //! action.payload === return response.data
    // builder.addCase(fetchAdd.fulfilled, (state, action) => {
    //   state.posts.push(action.payload);
    // });
    // //! action.payload === return id
    // builder.addCase(fetchDelete.fulfilled, (state, action) => {
    //   state.posts = state.posts.filter((post) => post.id !== action.payload);
    // });
  },
});


export default rtkSlice.reducer;
export const { increment, decrement, incrementB, decrementB } = rtkSlice.actions;
