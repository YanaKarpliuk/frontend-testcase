import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
