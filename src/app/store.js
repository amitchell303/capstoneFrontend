import { configureStore } from "@reduxjs/toolkit";
import api from "./api";


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});

export default store;
