import api from "./api";

const carAccessApi = api.injectEndpoints({
  endpoints: (build) => ({
    createAccess: build.mutation({
      query: ({ testVin }) => ({
        url: `/api`,
        method: "GET",
      }),
      invalidatesTags: ["Access"],
    }),
  }),
});
export const { useCreateAccessMutation } = carAccessApi;
