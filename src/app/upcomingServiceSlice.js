import api from "./api";

const upcomingServiceApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUpcomingServices: build.query({
      query: ({ testVin }) => ({
        url: `/api/upcomingService/getAllUpcoming/car/${testVin}`,
        method: "GET",
      }),
      providesTags: ["UpcomingServices"],
    }),
  }),
});
export const { useGetUpcomingServicesQuery } = upcomingServiceApi;
