import api from "./api";

const carAccessApi = api.injectEndpoints({
  endpoints: (build) => ({
    createAccess: build.mutation({
      query: ({ testVin, userId }) => ({
        url: `/api/carAccess/givePerms/car/${testVin}/user/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Access"],
    }),
  }),
});
export const { useCreateAccessMutation } = carAccessApi;
