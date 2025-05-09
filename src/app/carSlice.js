import { createSlice } from "@reduxjs/toolkit";
import api from "./api";
import { storeToken } from "./tokenService";

const CarApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyCars: build.query({
      query: () => ({
        url: `/api/cars/all`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});
export const { useGetMyCarsQuery } = CarApi;
