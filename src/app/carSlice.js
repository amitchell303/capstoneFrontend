import api from "./api";

const CarApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyCars: build.query({
      query: () => ({
        url: `/api/car/all`,
        method: "GET",
      }),
      providesTags: ["Car"],
    }),
    getSingleCar: build.query({
      query: () => ({
        url: `/api/car/:vin`,
        method: "GET",
      }),
      providesTags: ["Car"],
    }),

    addVehicle: build.mutation({
      query: ({
        vin,
        vehicleType,
        modelYear,
        make,
        model,
        bodyClass,
        carImg,
        userId,
      }) => ({
        url: `/api/car/${vin}`,
        method: "POST",
        body: {
          vin,
          vehicleType,
          modelYear,
          make,
          model,
          bodyClass,
          carImg,
          userId,
        },
      }),
      invalidatesTags: ["Car"],
    }),
    
    deleteVehicle: build.mutation({
      query: (vin) => ({
        url: `/api/car/${vin}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Car"],
    }),
  }),
});

export const {
  useGetMyCarsQuery,
  useGetSingleCarQuery,
  useAddVehicleMutation,
  useDeleteVehicleMutation,
} = CarApi;

// router.post("/:vin", middleware, createCar);
// router.get("/all", middleware, getAllCar);
// router.get("/:vin", middleware, getSingleCar);
// router.delete("/:vin", middleware, deleteCar);

// const deleteCar = async (req, res, next) => {
//   try {
//     const vin = req.params.vin;
//     const userId = req.user.id;

//     // check if user enters a valid vin number, if not return error message
//     if (isValidVin(vin) == false) {
//       res.status(422).send({
//         message: "invalid vin number",
//       });
//     }

//     const response = await prisma.car.deleteMany({
//       where: {
//         vin: vin,
//         userId: userId,
//       },
//     });

//     res.sendStatus(204);
//   } catch (error) {
//     res.status(404).send({
//       message: "that car does not exist",
//     });
//   }
// };

// module.exports = {
//   createCar,
//   getAllCar,
//   getSingleCar,
//   deleteCar,
// };
