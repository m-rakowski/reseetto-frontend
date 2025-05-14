import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { OcrResponseRM } from '../../../model/ocr-response-rm';

// Define async thunks using createAsyncThunk
export const uploadFileToBackend = createAsyncThunk(
  'indexPage/uploadFileToBackend',
  async (image: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', image);

      const { data } = await axios.post<OcrResponseRM>('/backend/api/image/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue('Failed to upload file');
    }
  }
);

export const updateTotal = createAsyncThunk(
  'indexPage/updateTotal',
  async (
    { newTotal, savedFileName }: { newTotal: string; savedFileName: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put<OcrResponseRM>(
        '/backend/api/image/update-total',
        { total: newTotal, savedFileName },
        {}
      );
      return data;
    } catch (error) {
      return rejectWithValue('Failed to update total');
    }
  }
);
