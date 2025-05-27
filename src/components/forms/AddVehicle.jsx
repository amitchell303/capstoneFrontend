import { useState } from "react";
import {
  useAddVehicleMutation,
  useUpdateMileageMutation,
} from "../../app/carSlice";

import "../../App.css";

const AddVehicleForm = () => {
  const [vin, setVin] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [bodyClass, setBodyClass] = useState("");
  const [carImg, setCarImg] = useState("");
  const [userId, setUserId] = useState("");
  const [addVehicle, { isLoading, error }] = useAddVehicleMutation();
  const [updateMiles] = useUpdateMileageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addVehicle({
        vin,
        vehicleType,
        modelYear,
        make,
        model,
        bodyClass,
        carImg,
        userId,
      }).unwrap();

      console.log("Car added:", response);
      setVin("");
      setVehicleType("");
      setModelYear("");
      setMake("");
      setModel("");
      setBodyClass("");
      setCarImg("");
      const mileage = 0;
      await updateMiles({ vin, mileage }).unwrap();
    } catch (err) {
      console.error("Error adding vehicle:", err);
      if (err.status === 422) {
        alert("Service is down.");
      }
    }
  };

  return (
    <div className="content-container">
      <h1>Add Vehicle</h1>
      <div className="glassmorphism-container">
        <form className="allForms" onSubmit={handleSubmit}>
          <div className="allForms-group">
            <label htmlFor="vin">Enter VIN</label>
            <input
              type="text"
              id="vin"
              placeholder="VIN number"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Vehicle"}
          </button>
          {error && <p>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;
