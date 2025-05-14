import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OcrResponseRM } from '../../../model/ocr-response-rm';
import { updateTotal, uploadFileToBackend } from './thunks';

export interface IndexPageSliceState {
  imageSrc: any;
  ocrResponse: OcrResponseRM | null;
  inputValue: string;
  isFetching: boolean;
  errorMessage: string;
}

export const indexPageSliceStateInitialState: IndexPageSliceState = {
  imageSrc: null,
  ocrResponse: null,
  inputValue: '',
  isFetching: false,
  errorMessage: '',
};

export const indexPageSlice = createSlice({
  name: 'indexPageSlice',
  initialState: indexPageSliceStateInitialState,
  reducers: {
    // Regular action reducers
    setImageSrc: (state, action: PayloadAction<any>) => {
      state.imageSrc = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Handle uploadFileToBackend thunk actions
    builder
      .addCase(uploadFileToBackend.pending, (state) => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(uploadFileToBackend.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorMessage = '';
        state.ocrResponse = action.payload;
      })
      .addCase(uploadFileToBackend.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload as string || 'Upload failed';
      })
      // Handle updateTotal thunk actions
      .addCase(updateTotal.pending, (state) => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(updateTotal.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorMessage = '';
        // We might want to update something in the state based on the response
      })
      .addCase(updateTotal.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload as string || 'Update failed';
      });
  }
});
