import api from "../app/api";
import { createSlice } from "@reduxjs/toolkit";

const accountApi = api.injectEndpoints({
  endpoints: (build) => ({
    addAccount: build.mutation({
      query: ({ firstname, lastname, email, password }) => ({
        url: "/api/auth/register",
        method: "POST",
        body: {
          firstname,
          lastname,
          email,
          password,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

const accountSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (build) => {
    if (api.endpoints?.AddAccount?.matchFulfilled)
      build.addMatcher(api.endpoints.users.matchFulfilled, storeToken);
  },
});
export default accountSlice.reducer;

export const { useAddAccountMutation } = accountApi;
