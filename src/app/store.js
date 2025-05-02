import { configureStore } from "@reduxjs/toolkit";
import api from "./api";
import reducer from "../components/userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});

export default store;
