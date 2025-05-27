import api from "./api";

const pastDueApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPastDue: build.query({
      query: ({ testVin }) => ({
        url: `/api/upcomingService/getAllDueUpcoming/car/${testVin}`,
        method: "GET",
      }),
      providesTags: ["PastDue"],
    }),
  }),
});
export const { useGetPastDueQuery } = pastDueApi;
