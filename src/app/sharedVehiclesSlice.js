import api from "./api";

const sharedCarApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSharedCars: build.query({
      query: ({ userId }) => ({
        url: `/api/carAccess/getAllSharedCars/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["SharedCar"],
    }),
  }),
});
export const { useGetSharedCarsQuery } = sharedCarApi;
