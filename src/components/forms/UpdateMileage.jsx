import { useState } from "react";
import { useUpdateMileageMutation } from "../../app/carSlice";

const UpdateMileage = ({ car }) => {
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
      <h1>Update Mileage</h1>
      <div className="glassmorphism-container">
        <form className="allForms" onSubmit={handleSubmit}>
          <div className="allForms-group">
            <label htmlFor="vin">Enter current mileage</label>
            <input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              placeholder="Mileage (required)"
              required
            />
          </div>
          <button type="submit">Update Mileage</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMileage;
