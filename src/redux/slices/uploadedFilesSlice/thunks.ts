import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UploadedFileRM } from '../../../model/uploaded-file-r-m';
import { OcrResponseRM } from '../../../model/ocr-response-rm';

// Define async thunks using createAsyncThunk
export const downloadUploadedFiles = createAsyncThunk(
  'uploadedFiles/downloadFiles',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<UploadedFileRM[]>('/backend/api/images');
      return data;
    } catch (error) {
      return rejectWithValue('Failed to download files');
    }
  }
);

export const deleteFile = createAsyncThunk(
  'uploadedFiles/deleteFile',
  async (savedFileName: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/backend/api/images/${savedFileName}`);
      return data;
    } catch (error) {
      return rejectWithValue('Failed to delete file');
    }
  }
);

export const updateTotal = createAsyncThunk(
  'uploadedFiles/updateTotal',
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
