
import api from "../app/api";
import { createSlice } from "@reduxjs/toolkit";

const UserApi = api.injectEndpoints({
  endpoints: (build) => ({
    // registerUser: build.mutation({
    //   query: (firstname, lastname, email, password) => ({
    //     url: `/api/auth/register`,
    //     method: "POST",
    //     body: { userId },
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    loginUser: build.mutation({
      query: ({ email, password }) => ({
        url: `api/auth/login`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    aboutMe: build.query({
        query:()=>({
            url: `/api/auth/me`,
            method: "GET",
        }), 
        providesTags: ["Auth"],
        
      }),
    updateUser: build.mutation({
      query: (firstname, lastname, email, password) => ({
        url: `/api/user/update/${userId}`,
        method: "PUT",
        body: {
          firstname, 
          lastname, 
          email, 
          password
        },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/user/delete/${id}`,
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

    getUser: build.query({
      query: (userId) => ({
        url: `/api/user/${userId}`,
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
  useGetUserQuery,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useAboutMeQuery,
} = UserApi;
