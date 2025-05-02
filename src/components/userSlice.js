import React from "react";
import api from "../app/api";

const UserApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
        query: (userId)=> ({
        url: `/auth/register`,
        method: "POST",
        body: {userId}
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: build.mutation({
      query: ({ email, password }) => ({
        url: `/auth/login`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["User"],
    }),
    aboutMe: build.query({
        query:()=>({
            url: `/auth/me`,
            method: "GET",
        }), 
        providesTags: ["User"],
        
      }),
    updateUser: build.mutation({
      query: (userId) =>({
        url: `/user/update/${userId}`,
        method: "PUT",
        body: {
            userId
        }
      }),
      invalidatesTags:["User"]
    }),
    deleteUser: build.mutation({
        query: (userId)=>({
          url: `/user/delete/${userId}`,
          method: "DELETE",
        }),
        invalidatesTags:["User"]
      }),
      
      getAllUsers: build.query({
        query:() => ({
            url: `/user/all`,
            method: "GET",
        }), 
        providesTags: ["User"],
      }),

      searchUser: build.query({
        query:()=>({
            url: `/user/${userId}`,
            method: "GET",
        }), 
        providesTags: ["User"],
        
      }),
  })
});

export const { useRegisterUserMutation,
    useSearchUserQuery,
    useLoginUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation, 
    useGetAllUsersQuery,
    useAboutMeQuery } = UserApi;
