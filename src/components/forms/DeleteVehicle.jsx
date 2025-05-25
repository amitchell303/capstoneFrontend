import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteVehicleMutation } from "../../app/carSlice";
import "../../styling/forms.css";

const DeleteVehicle = ({ car }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteVehicle, { isLoading, isSuccess, isError }] =
    useDeleteVehicleMutation();
  const navigate = useNavigate();
  const { vin } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirmDelete) {
      alert("Please confirm deletion by checking the box.");
      return;
    }
    try {
      const response = await deleteVehicle(vin).unwrap();
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      if (error.status === 422) {
        alert("Service is down.");
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="content-container">
      <main className="remove-vehicle">
        <h1>Remove Vehicle</h1>
        <div className="remove-vehicle-1">
          <strong>
            {car.make} {car.model} {car.vin}
          </strong>
        </div>
        <form className="allForms" onSubmit={handleSubmit}>
          <label className="remove-vehicle-2">
            <input
              type="checkbox"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
            />
            Confirm
          </label>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Removing..." : "Remove"}
          </button>
          {isSuccess && <p>Vehicle successfully deleted.</p>}
          {isError && <p>Failed to delete vehicle.</p>}
        </form>
      </main>
    </div>
  );
};

export default DeleteVehicle;
