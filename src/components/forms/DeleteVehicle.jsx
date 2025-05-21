import "../../styling/forms.css";

const DeleteVehicle = () => {
  return (
    <div className="content-container">
      <h1>Delete Vehicle</h1>
      <form className="allForms">
        <div className="section-1">
          <div className="allForms-group">
            <label>Enter "DELETE/(car vin)"</label>
            <input type="text" placeholder="DELETE/(CAR VIN)" />
          </div>
        </div>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default DeleteVehicle;
