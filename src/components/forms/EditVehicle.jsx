import { useState } from "react";
import { useUpdateMileageMutation } from "../../app/carSlice";
import "../../styling/forms.css";

const EditVehicleForm = ({ car }) => {
  const [mileage, setMileage] = useState("");
  const [updateMileage] = useUpdateMileageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mileage || isNaN(mileage)) {
      alert("Please enter a valid number for mileage.");
      return;
    }

    try {
      const result = await updateMileage({
        vin: car.vin,
        mileage: parseInt(mileage),
      });
      console.log("Mileage updated:", result);
      alert("Mileage successfully updated!");
    } catch (err) {
      console.error("Failed to update mileage:", err);
      alert("Failed to update mileage.");
    }
  };

  return (
    <div className="content-container">
      <h1>Edit Vehicle</h1>
      <form className="allForms" onSubmit={handleSubmit}>
        <div className="section-1">
          <div className="allForms-group">
            <label>Nickname</label>
            <input type="text" placeholder="Nickname (optional)" />
          </div>
        </div>
        <div className="section-2">
          <div className="allForms-group">
            <label>VIN</label>
            <input type="text" placeholder={car.vin} disabled />
          </div>
          <div className="allForms-group">
            <label>Plate Number</label>
            <input type="text" placeholder="Plate number (optional)" />
          </div>
        </div>
        <div className="section-3">
          <div className="allForms-group">
            <label>Make</label>
            <input type="text" placeholder={car.make} disabled />
          </div>
          <div className="allForms-group">
            <label>Model</label>
            <input type="text" placeholder={car.model} disabled />
          </div>
          <div className="allForms-group">
            <label>Year</label>
            <input type="text" placeholder={car.modelYear} disabled />
          </div>
        </div>
        <div className="section-4">
          <div className="allForms-group">
            <label>Current Mileage*</label>
            <input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              placeholder="Mileage (required)"
              required
            />
          </div>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVehicleForm;