import React from "react";
import api from "../app/api";
import { createSlice } from "@reduxjs/toolkit";

const UserApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (userId) => ({
        url: `/auth/register`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Auth"],
    }),
    loginUser: build.mutation({
      query: ({ email, password }) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    aboutMe: build.query({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    updateUser: build.mutation({
      query: (userId) => ({
        url: `/user/update/${userId}`,
        method: "PUT",
        body: {
          userId,
        },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (userId) => ({
        url: `/user/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getAllUsers: build.query({
      query: () => ({
        url: `/api/user/all`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    searchUser: build.query({
      query: () => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

const storeToken = (state, { payload }) => {
  localStorage.setItem("token", payload.token);
};

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (build) => {
    if (api.endpoints?.RegisterUser?.matchFulfilled)
      build.addMatcher(api.endpoints.user.matchFulfilled, storeToken);
  },
});
export default userSlice.reducer;

export const {
  useRegisterUserMutation,
  useSearchUserQuery,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useAboutMeQuery,
} = UserApi;
