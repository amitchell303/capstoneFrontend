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
        url: `/api/car/:vin`,
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
  }),
});

export const { useGetMyCarsQuery,useGetSingleCarQuery, useAddVehicleMutation } = CarApi;

// router.post("/:vin", middleware, createCar);
// router.get("/all", middleware, getAllCar);
// router.get("/:vin", middleware, getSingleCar);
// router.delete("/:vin", middleware, deleteCar);

// const createCar = async (req, res, next) => {
//   try {
//     const vin = req.params.vin;
//     const userId = req.user.id;

//     // check if user enters a valid vin number, if not return error message
//     if (isValidVin(vin) == false) {
//       res.status(422).send({
//         message: "invalid vin number",
//       });
//     }

//     // calls NHTSA api to get relavant car information
//     const vinDecoded = await decodeVin(vin);
//     const carImg = await getVehicleImg( await getVehicleId(vinDecoded.make, vinDecoded.model, vinDecoded.modelYear))
//     const response = await prisma.car.create({
//       data: {
//         vin: vin,
//         vehicleType: vinDecoded.vehicleType,
//         modelYear: parseInt(vinDecoded.modelYear),
//         make: vinDecoded.make,
//         model: vinDecoded.model,
//         bodyClass: vinDecoded.bodyClass,
//         carImg: carImg,
//         userId: userId,
//       },
//     });

//     if (response) {
//       // success condition
//       res.status(200).send({
//         message: "car succesfully added",
//         data: {
//           vin: response.vin,
//           vehicleType: response.vehicleType,
//           modelYear: response.modelYear,
//           make: response.make,
//           model: response.model,
//           bodyClass: response.bodyClass,
//           carImg: response.carImg,
//           userId: userId,

// const getAllCar = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const response = await prisma.car.findMany({
//       where: {
//         userId: userId,
//       },
//     });

//     //success condition
//     res.status(200).send(response);
//   } catch (error) {
//     res.status(500).send({
//       message: "Internal server error",
//     });
//   }
// };

// const getSingleCar = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const vin = req.params.vin;

//     const response = await prisma.car.findFirstOrThrow({
//       where: {
//         vin: vin
//       },
//     })

//     res.status(200).send(response)
//   } catch (error) {
//     if (error.code == "P2025") {
//       res.status(404).send({
//         message: "car not found"
//       })
//     } else {
//       res.status(500).send({
//         message: "Internal server error",
//       });
//     }
//   }
// };

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
