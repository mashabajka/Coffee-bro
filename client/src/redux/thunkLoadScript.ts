import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadScript = createAsyncThunk(
  'script/loadScript',
  async (src: string, { rejectWithValue }) => {
    try {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);

      return new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(rejectWithValue('Failed to load script'));
      });
    } catch (error) {
      return rejectWithValue('Failed to load script');
    }
  }
);