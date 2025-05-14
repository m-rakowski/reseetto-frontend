// Simple helper to make TypeScript happy with thunks
// This is a workaround for the 'Argument of type is not assignable to parameter of type UnknownAction' error

import { AnyAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

// This is a wrapper that makes TypeScript think our thunk is an action
// It works by adding a dummy 'type' property that's never used at runtime
export const withTypeFix = <T extends (...args: any[]) => any>(thunkFunction: T): T & AnyAction => {
  const wrappedThunk = thunkFunction as any;
  wrappedThunk.type = `thunk/${Math.random().toString(36).substring(7)}`;
  return wrappedThunk;
};

// Helper to create new thunks with correct typing
export const createAppThunk = <Args extends any[], Return>(
  thunkFunction: (...args: Args) => (dispatch: AppDispatch) => Return
) => {
  return (...args: Args) => withTypeFix(thunkFunction(...args));
};
