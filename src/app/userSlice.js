import { createSlice } from "@reduxjs/toolkit";
import { storeToken } from "./tokenService";
import api from "./api";

const UserApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: ({ firstname, lastname, email, password }) => ({
        url: `/api/auth/register`,
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

    loginUser: build.mutation({
      query: ({ email, password }) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["User"],
    }),

    aboutMe: build.query({
      query: () => ({
        url: `/api/auth/me`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUser: build.mutation({
      query: ({
        userId,
        firstname,
        lastname,
        email,
        password,
        activated,
        deactivatedOn,
        street,
        city,
        state,
        postal,
      }) => ({
        url: `/api/user/update/${userId}`,
        method: "PUT",
        body: {
          firstname,
          lastname,
          email,
          password,
          activated,
          deactivatedOn,
          street,
          city,
          state,
          postal,
        },
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (userId) => ({
        url: `/api/user/delete/${userId}`,
        method: "PUT",
        body: {
          activated: false,
          deactivatedOn: Date.now(),
        },
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

    getUser: build.query({
      query: (userId) => ({
        url: `/api/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

// stores the token from register api call
const registerSlice = createSlice({
  name: "registerUser",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.registerUser.matchFulfilled, storeToken);
  },
});

// stores the token from login api call
const loginSlice = createSlice({
  name: "loginUser",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.loginUser.matchFulfilled, storeToken);
  },
});

export const registerReducer = registerSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const {
  useRegisterUserMutation,
  useGetUserQuery,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useAboutMeQuery,
} = UserApi;
