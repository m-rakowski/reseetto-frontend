import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadedFileRM } from '../../../model/uploaded-file-r-m';
import { OcrResponseRM } from '../../../model/ocr-response-rm';
import { AppState } from '../../store';
import { downloadUploadedFiles, deleteFile, updateTotal } from './thunks';

export interface UploadedFilesSliceState {
  allUploadedFiles: UploadedFileRM[];
  isFetching: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: UploadedFilesSliceState = {
  allUploadedFiles: [],
  isFetching: false,
  isError: false,
  errorMessage: ''
};

export const uploadedFilesSlice = createSlice({
  name: 'uploadedFilesSlice',
  initialState,
  reducers: {
    setUploadedFiles: (state, action: PayloadAction<UploadedFileRM[]>) => {
      state.allUploadedFiles = action.payload;
    },
    resetUploadedFiles: (state) => {
      state.allUploadedFiles = [];
    },
  },
  extraReducers: (builder) => {
    // Handle downloadUploadedFiles thunk
    builder
      .addCase(downloadUploadedFiles.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(downloadUploadedFiles.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.allUploadedFiles = action.payload;
      })
      .addCase(downloadUploadedFiles.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload as string || 'Failed to download files';
      })
      
      // Handle deleteFile thunk
      .addCase(deleteFile.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        // Remove the deleted file from the array
        state.allUploadedFiles = state.allUploadedFiles.filter(
          (file) => file.id !== action.payload.id
        );
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload as string || 'Failed to delete file';
      })
      
      // Handle updateTotal thunk
      .addCase(updateTotal.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(updateTotal.fulfilled, (state) => {
        state.isFetching = false;
        state.isError = false;
      })
      .addCase(updateTotal.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload as string || 'Failed to update total';
      });
  }
});

// Selectors
export const getUploadedFiles = (state: AppState) => state.uploadedFiles.allUploadedFiles;
export const getIsError = (state: AppState) => state.uploadedFiles.isError;
export const getIsFetching = (state: AppState) => state.uploadedFiles.isFetching;

// Re-export thunks to maintain backwards compatibility
export { downloadUploadedFiles, deleteFile, updateTotal };
