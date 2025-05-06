import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = "https://fsa-capstone-backend-9b3e597200f5.herokuapp.com";
// const API_URL = "http://localhost:3000";
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Auth"],
  endpoints: () => ({}),
});
export default api;
