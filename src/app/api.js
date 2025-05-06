import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./tokenService";

const API_URL = "https://fsa-capstone-backend-9b3e597200f5.herokuapp.com";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
export default api;
