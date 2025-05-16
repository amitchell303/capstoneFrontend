import api from "./api";

const maintenanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLogs: build.query({
      query: ({ testVin }) => ({
        url: `/api/servicelog/getAll/car/${testVin}`,
        method: "GET",
      }),
      providesTags: ["Maintenance"],
    }),
    createLog: build.mutation({
      query: ({
        testVin,
        milage,
        serviceBy,
        serviceType,
        serviceCost,
        serviceDetail,
      }) => ({
        url: `/api/servicelog/create/car/${testVin}`,
        method: "POST",
        body: {
          milage,
          serviceBy,
          serviceType,
          serviceCost,
          serviceDetail,
        },
      }),
      invalidatesTags: ["Maintenance"],
    }),
  }),
});

export const { useGetLogsQuery, useCreateLogMutation } = maintenanceApi;
