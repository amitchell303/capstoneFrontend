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
    <main className="rmVeh-page">
      <h1>Remove Vehicle</h1>
      <div className="rmVeh-sect-1">
        <div className="rmVeh-carCard">
          <img src={car.carImg} alt={`${car.make} ${car.model}`} />
          <div className="rmVeh-carCard-text">
            <p>
              {car.modelYear} {car.make} {car.model}
            </p>
            <p>{car.vin}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
            />
            <span className="checkmark"></span>
            Confirm
          </label>
        </form>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Removing..." : "Remove"}
      </button>
      {isSuccess && <p>Vehicle successfully deleted.</p>}
      {isError && <p>Failed to delete vehicle.</p>}
    </main>
  );
};

export default DeleteVehicle;
