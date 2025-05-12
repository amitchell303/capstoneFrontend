import { use, useState } from "react";
import { useAddVehicleMutation } from "../../app/carSlice";
import "../../App.css";

export default function AddVehicle() {
  const [vin, setVin] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [bodyClass, setBodyClass] = useState("");
  const [carImg, setCarImg] = useState("");
  const [userId, setUserId] = useState("");
  const [addVehicle] = useAddVehicleMutation();

  async function submit(event) {
    event.preventDefault();
    console.log("Vin: ", vin);
    console.log(", vehicleType: ", vehicleType);
    console.log(", modelYear: ", modelYear);
    console.log(", make: ", make);
    console.log(", model: ", model);
    console.log(", bodyClass: ", bodyClass);
    console.log(", carImg: ", carImg);
    console.log(", userId: ", userId);

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
      try {
        localStorage.setItem("token", response.token);
        setVin("");
        setVehicleType("");
        setModelYear("");
        setMake("");
        setModel("");
        setBodyClass("");
        setCarImg("");
        setUserId("");
      } catch (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="content-container">
      <h1>Add a Vehicle</h1>
      <form className="addVeh-form" onSubmit={submit}>
        <label>VIN Number</label>
        <input
          type="text"
          placeholder="VIN number"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <label>Make</label>
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
        <label>Model</label>
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <label>Year</label>
        <input
          type="text"
          placeholder="Year"
          value={modelYear}
          onChange={(e) => setModelYear(e.target.value)}
        />
        <button className="addVeh-btn" type="submit" disabled={!vin}>
          Add Vehicle
        </button>
      </form>
    </div>
  );
}
