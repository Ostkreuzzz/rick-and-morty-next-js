import { configureStore, combineSlices } from "@reduxjs/toolkit";
import bookmarkSlice from "./slices/bookmarkReducer";

const rootReducer = combineSlices({
  bookmarkStore: bookmarkSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
