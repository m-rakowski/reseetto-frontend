import { configureStore } from '@reduxjs/toolkit';
import {
  uploadedFilesSlice,
} from './slices/uploadedFilesSlice/uploadedFilesSlice';
import { indexPageSlice } from './slices/indexPageSlice/indexPageSlice';

// Create Redux store
const store = configureStore({
  reducer: {
    uploadedFiles: uploadedFilesSlice.reducer,
    indexPage: indexPageSlice.reducer,
  }
});

export default store;

// Infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// For backwards compatibility
export type AppState = RootState;
